import { getLocaleTimeFormat } from '@angular/common';
import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLXS from 'xlsx';
//variables
const EXCEL_TYPE = 'application/vnd.openxlmformats-officedocument.spreadsheetml.sheet; charset=UTF-8'
const EXCEL_EXT = '.xlsx'


@Injectable({
  providedIn: 'root'
})
export class ExportarexcelService {

  constructor() { }

  exportExcel(json:any[], excelFileName: string):void{
    const worksheet : XLXS.WorkSheet = XLXS.utils.json_to_sheet(json);
    const workbook: XLXS.WorkBook = { Sheets: {'data': worksheet}, SheetNames: ['data'] };
    const excelBuffer: any = XLXS.write(workbook, { bookType: 'xlsx', type: 'array'});
    //llamamos al metodo para guardar ficheros
    this.saveExcel(excelBuffer,excelFileName);
  }

  private saveExcel(buffer: any, fileName:string):void{
    const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
    FileSaver.saveAs(data, fileName+ '_export_'+ new Date + EXCEL_EXT);
  }
}
