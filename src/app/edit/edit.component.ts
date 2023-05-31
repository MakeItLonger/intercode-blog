import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PostsService } from '../posts.service';
import { HeaderService } from '../header.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  id!: string;
  newMode? = true;
  files: any[] = [];
  creationPostForm!: FormGroup;
  pictureData: string[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postsService: PostsService,
    private headerService: HeaderService,
  ) {}

  ngOnInit(): void {
    this.headerService.isVisible$.next(false);

    this.id = this.route.snapshot.params['id'];
    this.newMode = this.id ? false : true;
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.newMode = this.id ? false : true;
    });

    this.creationPostForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      topic: new FormControl(null, Validators.required),
      content: new FormControl(null, Validators.required),
      picture: new FormControl(null, Validators.required),
    });

    if (!this.newMode) {
      this.postsService.getPostById(this.id).subscribe((post) => {
        this.creationPostForm.patchValue({
          title: post.title,
          topic: post.topic,
          content: post.content,
        });
      });
    }
  }

  onCreatePost() {
    if (this.newMode) {
      this.postsService
        .createPost(
          this.creationPostForm.value.title,
          this.creationPostForm.value.topic,
          this.creationPostForm.value.content,
          this.creationPostForm.value.picture,
        )
        .subscribe((post) => {
          this.creationPostForm.reset();
          this.pictureData = [];
          this.files.length = 0;
          this.router.navigate(['/post', post._id]);
        });
    } else {
      this.onEditPost();
    }
  }

  onEditPost() {
    this.postsService
      .editPost(
        this.id,
        this.creationPostForm.value.title,
        this.creationPostForm.value.topic,
        this.creationPostForm.value.content,
        this.creationPostForm.value.picture,
      )
      .subscribe((post) => {
        this.creationPostForm.reset();
        this.router.navigate(['/post', post._id]);
      });
  }

  onFileDropped($event: any) {
    const files = $event;

    this.creationPostForm.patchValue({ picture: files });

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.pictureData.push((e.target as FileReader).result as string);
      };
      reader.readAsDataURL(files[i]);
    }
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler($event: Event) {
    const target = $event.target as HTMLInputElement;
    const files = target.files as any;
    this.creationPostForm.patchValue({ picture: files });

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.pictureData.push((e.target as FileReader).result as string);
      };
      reader.readAsDataURL(files[i]);
    }

    this.prepareFilesList(files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes: any, decimals: any) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}
