import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  id?: number;
  newMode? = true;
  files: any[] = [];
  creationPostForm!: FormGroup;
  pictureData?: string | null;

  constructor(private route: ActivatedRoute, private postsService: PostsService) {}

  ngOnInit(): void {
    this.creationPostForm = new FormGroup({
      title: new FormControl(null),
      topic: new FormControl(null),
      content: new FormControl(null),
      picture: new FormControl(null),
    });

    this.id = +this.route.snapshot.params['id'];
    this.newMode = this.id ? false : true;
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.newMode = this.id ? false : true;
    });
  }

  onCreatePost() {
    this.postsService.createPost(
      this.creationPostForm.value.title,
      this.creationPostForm.value.topic,
      this.creationPostForm.value.content,
      this.creationPostForm.value.picture,
    );
    this.creationPostForm.reset();
    this.pictureData = null;
    this.files.length = 0;
  }

  onFileDropped($event: any) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler($event: Event) {
    const target = $event.target as HTMLInputElement;
    const files = target.files as any;
    const file = files[0];
    this.creationPostForm.patchValue({ picture: file });
    const allowedFileTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (file && allowedFileTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.pictureData = (e.target as FileReader).result as string;
      };
      reader.readAsDataURL(file);
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
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
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
    this.uploadFilesSimulator(0);
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
