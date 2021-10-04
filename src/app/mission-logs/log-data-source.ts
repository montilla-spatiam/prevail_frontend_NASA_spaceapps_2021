import { CollectionViewer, DataSource } from "@angular/cdk/collections"
import { Component } from "@angular/core";
import { BehaviorSubject, of, timer, Observable } from "rxjs";
import { catchError, finalize, takeWhile } from "rxjs/operators";
import { Log } from '../log';
import { DataService } from "../services/data.service";

@Component({
  template: ''
})

export class LogDataSource implements DataSource<Log> {
  private logSubject = new BehaviorSubject<Log[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  alive = true;

  public loading$ = this.loadingSubject.asObservable();

  constructor (
    private data: DataService
  ) {
    let timer$ = timer(0, 10000);
    timer$.pipe(
      takeWhile(() => this.alive)
    ).subscribe(val => this.getLogs())
  }

  connect (collectionViewer: CollectionViewer): Observable<Log[]> {
    return this.logSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.logSubject.complete();
    this.loadingSubject.complete();
  }

  getLogs() {
    this.loadingSubject.next(true);
    this.data.getLogs().pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    )
    .subscribe((logs:any) => {this.logSubject.next(logs['logs']); console.log(logs)})
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
