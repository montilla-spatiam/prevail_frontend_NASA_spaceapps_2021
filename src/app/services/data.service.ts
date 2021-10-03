import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';
import { User } from '../user';
import { Log } from '../log';
import { Entries } from '../entries';

  const baseUrl =     'http://44.193.83.129:8000';
  const userUrl =     '/api/users/';
  const regKeyUrl =   '/register/';
  const logsUrl =     '/api/logs';
  const addUser =     '/add_user/';
  const oLogsUrl =    '/api/loglist'
  const entriesUrl =  '/api/entries/'

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private authToken = 'Token 741351f6b9d59cf0c92ba56fc25ce4499e7a0e6b';
  private handleError: HandleError;

  private httpOptions = {
    headers: new HttpHeaders ({
      'Content-Type': 'application/json',
      Authorization: this.authToken
    })
  }

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler
  ) {this.handleError = httpErrorHandler.createHandleError('DataService')}

  // Test Registration Key
  public validateKey(keyVal: string) {
    return this.http.get(baseUrl + regKeyUrl + keyVal + '/', {responseType: 'text'})
      .pipe(
        catchError(this.handleError('checkKey', []))
      )
  }

  public createUser(userName: string, pw: string) {

  }

  public getUser(username: string, pw: string) {

  }

  public getLog(oid?: string): Observable<Log[]> {
    let urlString = baseUrl + logsUrl;
    if (oid) {
      urlString += '/' + oid;
    }
    return this.http.get<Log[]>(urlString, this.httpOptions)
      .pipe(
        catchError(this.handleError('getLog', []))
      )
  }

  public addLog(log: Log): Observable<Log> {
    return this.http.post<Log>(baseUrl + logsUrl, log, this.httpOptions)
      .pipe(
        catchError(this.handleError('postLog', log))
      )
  }

  public getOrderedLogList(oid?: string): Observable<Log[]> {
    return this.http.get<Log[]>(baseUrl + oLogsUrl + oid)
      .pipe(
        catchError(this.handleError('getOrderedLogList', []))
      )
  }

  public getEntries(oid?: string): Observable<Entries[]> {
    return this.http.get<Entries[]>(baseUrl + entriesUrl + oid)
      .pipe(
        catchError(this.handleError('getEntries', []))
      )
  }

  public addEntry(entry: Entries): Observable<Entries> {
    return this.http.post<Entries>(baseUrl + entriesUrl, entry, this.httpOptions)
      .pipe(
        catchError(this.handleError('addEntry', entry))
      )
  }
}
