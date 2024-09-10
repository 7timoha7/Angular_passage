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
  @Output() pageChange = new EventEmitter<PageEvent>(); // Создаем событие для передачи информации о смене страницы
  @Input() pageInfo?: PageInfo; // Входящий параметр с информацией о страницах

  length = 0; // Общее количество элементов
  pageSize = 20; // Количество элементов на странице
  pageIndex = 0; // Текущий индекс страницы
  pageSizeOptions = []; // Варианты размера страницы

  ngOnChanges(changes: SimpleChanges) {
    // Проверяем, было ли изменено pageInfo
    if (changes['pageInfo'] && this.pageInfo) {
      this.updatePaginatorValues();
    }
  }

  updatePaginatorValues() {
    // this.pageIndex = 1; // Материальный пагинатор использует индекс страниц, начиная с 0
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
    this.pageChange.emit(event); // Передаем событие в родительский компонент
  }
}
