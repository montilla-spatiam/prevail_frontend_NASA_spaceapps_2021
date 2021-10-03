import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { LogDataSource } from './log-data-source';

@Component({
  selector: 'app-mission-logs',
  templateUrl: './mission-logs.component.html',
  styleUrls: ['./mission-logs.component.scss']
})
export class MissionLogsComponent implements OnInit {
  displayedColumns: string[] = ['Mission', 'Activity', 'Entries', 'Users', 'Date and Author'];
  dataSource: LogDataSource = <any>[];

  constructor(
    private data: DataService
  ) { }

  ngOnInit(): void {
    this.dataSource = new LogDataSource(this.data);
    this.dataSource.getLogs();

    console.log(this.dataSource)
  }

}
