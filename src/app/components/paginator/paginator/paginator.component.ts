import {Component, EventEmitter, Input, Output, OnChanges, SimpleChanges} from '@angular/core';
import {MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {JsonPipe} from "@angular/common";
import {PageInfo} from "../../../interfaces/type";

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    JsonPipe,
  ],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})
export class PaginatorComponent implements OnChanges {
  @Output() pageChange = new EventEmitter<PageEvent>();
  @Input() pageInfo?: PageInfo;

  length = 0;
  pageSize = 20;
  pageIndex = 0;
  pageSizeOptions = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['pageInfo'] && this.pageInfo) {
      this.updatePaginatorValues();
    }
  }

  updatePaginatorValues() {
    this.pageSize = this.pageInfo!.pageSize;
    this.length = this.pageInfo!.totalItems;
  }

  handlePageEvent(event: PageEvent) {
    if (event.pageIndex === 0 || event.pageIndex < 1) {
      this.pageIndex = 1;
    } else {
      this.pageIndex = event.pageIndex;
    }

    this.pageSize = event.pageSize;
    this.pageChange.emit(event);
  }
}
