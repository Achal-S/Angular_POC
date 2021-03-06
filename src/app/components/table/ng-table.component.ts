import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, ChangeDetectorRef, Compiler, ViewContainerRef, ViewChild, ComponentRef, ComponentFactory, ComponentFactoryResolver} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'ng-table',
  templateUrl: './ng-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgTableComponent {
  // Table values

  @Input() public rows:Array<any> = [];
  @Input() public editingRow:number;
  @Input() public editingColumn:number;
  @Input()
  public set config(conf:any) {

    this._config = conf;
  }


  // Outputs (Events)
  @Output() public tableChanged:EventEmitter<any> = new EventEmitter();
  @Output() public cellClicked:EventEmitter<any> = new EventEmitter();
  @Output() public scrolledDown:EventEmitter<any> = new EventEmitter();
  @Output() public valueEdit:EventEmitter<any> = new EventEmitter();

  public currentChanges: any = {};

  @Input()
  public set columns(values:Array<any>) {
    values.forEach((value:any) => {

      let column = this._columns.find((col:any) => col.name === value.name);
      if (column) {
        Object.assign(column, value);
      }
      if (!column) {
        this._columns.push(value);
      }
    });
  }

  private _columns:Array<any> = [];
  private _config:any = {};
  public scrollPercentage:number = 0;

  public constructor( public ref: ChangeDetectorRef, private componentFactoryResolver: ComponentFactoryResolver, private compiler: Compiler) {
  }



  public get columns():Array<any> {
    return this._columns;
  }

  public get config():any {
    return this._config;
  }

  public get configColumns():any {
    let sortColumns:Array<any> = [];

    this.columns.forEach((column:any) => {
      if (column.sort) {
        sortColumns.push(column);
      }
    });

    return {columns: sortColumns};
  }

  public onChangeTable(column:any):void {
    this._columns.forEach((col:any) => {
      if (col.name !== column.name && col.sort !== false) {
        col.sort = '';
      }
    });
    this.tableChanged.emit({sorting: this.configColumns});
    this.ref.markForCheck();
  }



  public checkScroll(event:any) {
      this.scrollPercentage = event.target.scrollTop / (event.target.scrollHeight - event.target.clientHeight);
      if (this.scrollPercentage > this.config.renderMoreAt) {
          this.scrolledDown.emit(this.scrollPercentage);
      }
  };


  public getData(row:any, propertyName:string):string {
    return propertyName.split('.').reduce((prev:any, curr:string) => prev[curr], row);
  }

  public cellClick(row:any, column:any):void {
    this.cellClicked.emit({row, column});
  }

  public setRowToEdit(rowIndex:any, column:any){
    this.editingRow = rowIndex;
    for(let col of this.columns){
      if(col.editWith != this.columns[column].name){
        col.isEditing = false;
      }else if(col.editWith === this.columns[column].name){
        col.isEditing = true;
      }
    }
    this.columns[column].isEditing = true;
  }

  public updateChanges(colName:any, val:any){
    this.currentChanges[colName] = val.value;
  }

  public submitChange(row:any, rIndex:number, columnName:string, cIndex:number, newVal:any ){
    let valueChange = {
                        rowChanged: row,
                        rowIndex: rIndex,
                        columnChanged: columnName,
                        columnIndex: cIndex,
                        oldValue: row[columnName],
                        newValue: newVal.value
                      }

    let allChanges = [valueChange];

    this.columns.forEach((col, index) => {
      if(col.editWith === this.columns[cIndex].name && this.currentChanges[col.name] != undefined){
        let newValueChange = {
                              rowChanged: row,
                              rowIndex: rIndex,
                              columnChanged: col.name,
                              columnIndex: index,
                              oldValue: row[col.name],
                              newValue: this.currentChanges[col.name]
                             }
        allChanges.push(newValueChange);
      }
    })
    // Check for changes
    let noChanges = true;
    for(let change of allChanges){
      if(change.newValue != change.oldValue){
        noChanges = false;
      }
    }
    if(noChanges){
      this.editingRow = null;
      return;
    }
    this.valueEdit.emit(allChanges);
    this.editingRow = null;
  }
}
