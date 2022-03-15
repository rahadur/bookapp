import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {environment} from '@env/environment';
import {AppInfo} from '@core/models/app-info';
import {Book} from '@app/modules/book/models/book';
import {Chapter} from '@app/modules/book/models/chapter';
import {Audio} from '@app/modules/book/models/audio';
import {StorageKey, StorageService} from '@core/services/storage.service';


@Injectable({
  providedIn: 'root',
})
export class BookService {

  constructor(private http: HttpClient) {
  }

  fetchAppInfo(): Observable<AppInfo> {
    const params = new HttpParams()
      .append('fields[]', `*`)
      .append('fields[]', `related_books.book`)
      .append('fields[]', `books.book`);

    return this.http.get<AppInfo>(`${environment.apiUrl}/items/apps/${environment.appId}`, { params})
      .pipe(map((response: any) => response.data));
  }

  fetchBooks(): Observable<Book[]> {
    const params = new HttpParams()
      // .append('filter[category][_eq]', `${environment.category}`)
      .append('fields[]', '*')
      .append('fields[]', 'genre.id')
      .append('fields[]', 'genre.title')
      .append('filter', `{ "genres": { "genres_id": { "_in": [2] } } }`);
      //.append('sort', 'date_created');

    return this.http
      .get<Book[]>(
        `${environment.apiUrl}/items/books`, { params })
      .pipe(map((response: any) => response.data));
  }

  fetchBooksIds(ids: string[]): Observable<Book[]> {
    const params = new HttpParams()
      // .append('filter[category][_eq]', `${environment.category}`)
      .append('fields[]', '*')
      .append('fields[]', 'author.id')
      .append('fields[]', 'author.name')
      .append('fields[]', 'genre.id')
      .append('fields[]', 'genre.title')
      .append('filter', `{ "id": { "_in": [${[...ids]}] }  }`);
    //.append('sort', 'date_created');

    return this.http
      .get<Book[]>(
        `${environment.apiUrl}/items/books`, { params })
      .pipe(map((response: any) => response.data));
  }

  fetchBooksByGenres(...genres: number[]): Observable<Book[]> {
    const params = new HttpParams()
      .append('fields[]', '*')
      .append('fields[]', 'author.id')
      .append('fields[]', 'author.name')
      .append('fields[]', 'genres.genres_id.id')
      .append('fields[]', 'genres.genres_id.title')
      .append('filter', `{ "genres":{"genres_id":{"_in":[${[...genres]}] }}}`);
    //.append('sort', 'date_created');

    return this.http
      .get<Book[]>(
        `${environment.apiUrl}/items/books`, { params })
      .pipe(map((response: any) => response.data));
  }


  fetchBook(bookId: string): Observable<Book> {
    const params = new HttpParams()
      .append('fields[]', '*')
      .append('fields[]', 'author.id')
      .append('fields[]', 'author.name')
      .append('fields[]', 'genre.title');

    return this.http.get<Book>(`${environment.apiUrl}/items/books/${bookId}`, { params })
        .pipe(map((response: any) => response.data));
  }

  fetchChapters(bookId: string): Observable<Chapter[]> {
    const params = new HttpParams()
      .append('fields', '*,sections.title,sections.content')
      .append('filter[book][_eq]', `${bookId}`)
      .append('sort', 'date_created');

    return this.http
      .get<Chapter[]>(
        `${environment.apiUrl}/items/chapters`, {params})
      .pipe(map((response: any) => response.data));
  }

  fetchAudios(bookId: string): Observable<Audio[]> {
    const params = new HttpParams()
      .append('filter[book][_eq]', `${bookId}`)
      .append('sort', 'date_created');

    return this.http
      .get<Audio[]>(
        `${environment.apiUrl}/items/audios`, {params})
      .pipe(map((response: any) => response.data));
  }
}
