import { Injectable } from '@angular/core';
import { Subject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DropZoneService {
  readonly whitelist = ['image/jpeg', 'image/png', 'image/gif'];

  readonly files$ = new Subject<File[]>();

  readonly files = this.files$.pipe(
    map((files) =>
      files.filter((file) => this.whitelist.includes(file.type.toLowerCase()))
    )
  );
}
