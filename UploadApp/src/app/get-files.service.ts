import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GetFilesService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }


  // Get Images
  getImages() {
    return this.http.get('/api/v1/');
  }
  //remove Image
  removeImage(id): Observable<any> {
    var options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    return this.http.delete(`/api/v1/removeFile/${id}`, options);

  }


  // add image
  addImage(image: File): Observable<any> {
    var formData: any = new FormData();
    formData.append("randImage", image);
    return this.http.post("/api/v1/uploadfile", formData, {
      reportProgress: true,
      observe: 'events'
    })
  }

  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
