import * as JSPdf from 'jspdf';
import {IProjectDailyReport} from '../../../../api/models/iproject-daily-report';
import {IProjectInformation} from '../../../../api/models/iproject-information';
import {DatePipe} from '@angular/common';
import {Observable} from 'rxjs';
import {weekdays} from 'moment';
import {isBetween} from 'ngx-bootstrap/bs-moment/utils/date-compare';

declare var jsPDF: any;

export enum PdfPosition {
  Left = 1,
  Center = 2,
  Right = 3,
  Complete = 4
}

export enum TextAlign {
  Left = 1,
  Center = 2,
  Right = 3
}

export interface TextPosition {
  x: number;
  y: number;
}

export interface FontConfig {
  size: number;
  color: string;
  style: string;
}

export interface CircleConfig {
  x: number;
  y: number;
  radio: number;
  color: string;
}

export interface SquareConfig {
  x: number;
  y: number;
  height: number;
  withd: number;
  color: string;
}

interface Week {
  days: any[];
}

export class DailyReportExport {

  isStart = true;
  startDate: Date;
  endDate: Date;
  date: Date;
  show = false;
  weeks: Week[] = [];

  month: string;
  year: string;
  weekDays: any[];

  addXSpace = 0;
  daysCount = 0;
  currentpage = 0;
  currentY = 0;
  //currentX = 0;
  pdf: any = new jsPDF('p', 'pt', 'a4');

  static create(): DailyReportExport {
    const report = new DailyReportExport();
    const color = report.hexToRgb('#337ab7');
    report.pdf.setDrawColor(color.r, color.g, color.b);
    report.pdf.setFillColor(color.r, color.g, color.b);
    report.pdf.rect(0, 0, 600, 60, 'F');

    //report.pdf.imageLoadFromUrl('image1.jpg');
    // place this mage at given X, Y coordinates on the page
    //report.pdf.imagePlace(20, 40);

    return report;

  }

  static createWithLogo(): Observable<DailyReportExport>  {
    return Observable.create((observer) => {
      const report = new DailyReportExport();
      const color = report.hexToRgb('#337ab7');
      report.pdf.setDrawColor(color.r, color.g, color.b);
      report.pdf.setFillColor(color.r, color.g, color.b);
      report.pdf.rect(0, 0, 600, 80, 'F');
      report.getImageFrom('/img/logo.png').subscribe((result: any) => {
        report.pdf.addImage(result, 'PNG',  5, 10, result.width, result.height);
        observer.next(report);
      });
    });

    //report.pdf.imageLoadFromUrl('image1.jpg');
    // place this mage at given X, Y coordinates on the page
    //report.pdf.imagePlace(20, 40);

    // report.addSpace(80);

  }

  constructor() {
  }

  getImageFrom(url): Observable<any> {

    return Observable.create((observer) => {
      const img = new Image();
      Observable.fromEvent(img, 'load').subscribe((result) => {
        observer.next(img);
        console.log(result);
      });

      img.src = url;
    });

  }

  private centerX(): number {
    return 200;
  }

  private LeftX(): number {
    return 25;
  }

  private RigthX(): number {
    return 400;
  }

  textLenght(text: string): number {
    return this.pdf.getStringUnitWidth(text) * this.pdf.internal.getFontSize();
  }

  addCalendarTitle(title: string, position: PdfPosition, color: string = null, positionX: number = null, positionY: number = null, isCalendar1Title: boolean = false, fontSize: number = 13, fontType: string = 'bold') {
    this.checkAddPage();

    let x = 0;
    let center: string = null;
    this.pdf.setFontSize(fontSize);
    this.pdf.setFontType(fontType);
    switch (position) {
      case PdfPosition.Center:
        x = (this.pdf.internal.pageSize.width / 2) - (this.textLenght(title) / 2);
        center = 'center';
        break;
      case PdfPosition.Left:
        x = this.LeftX();
        break;
      case PdfPosition.Right:
        x = 600 - 25 - this.textLenght(title);
        break;
    }
    let c: any = {r: 0, g: 88, b: 161};
    if (color !== null) {
      c = this.hexToRgb(color);
    }
    this.pdf.setTextColor(c.r, c.g, c.b);
    if (positionX !== null) {
      x = positionX;
    }
    this.pdf.text(title, x, this.currentY + positionY);
  }

  addTitle(title: string, position: PdfPosition, color: string = null, positionX: number = null, isLogoTitle: boolean = false, isHeaderTitlePart2: boolean = false) {
    this.checkAddPage();

    let x = 0;
    let center: string = null;
    this.pdf.setFontSize(13);
    switch (position) {
      case PdfPosition.Center:
        x = (this.pdf.internal.pageSize.width / 2) - (this.textLenght(title) / 2);
        center = 'center';
        break;
      case PdfPosition.Left:
        x = this.LeftX();
        break;
      case PdfPosition.Right:
        x = 600 - 25 - this.textLenght(title);
        break;
    }
    let c: any = {r: 0, g: 88, b: 161};
    if (color !== null) {
      c = this.hexToRgb(color);
    }
    this.pdf.setTextColor(c.r, c.g, c.b);
    if (positionX !== null) {
      x = positionX;
    }

    if (isLogoTitle) {
      this.pdf.text(title, x, this.currentY + 27);
    }else if(isHeaderTitlePart2){
      this.pdf.text(title, x, this.currentY + 20);
    }else{
      this.pdf.text(title, x, this.currentY);
    }
  }

  checkAddPage() {
    if ((this.pdf.internal.pageSize.height - (this.currentY)) <= 100) {
      this.currentY = 60;
      this.pdf.addPage();

    }
  }

  addPage(checkHeigth: number) {
    if ((this.pdf.internal.pageSize.height - (this.currentY)) <= checkHeigth) {
      this.currentY = 60;
      this.pdf.addPage();
    }
  }

  addCalendarWeekDays(title: string, position: PdfPosition, align: TextAlign = TextAlign.Left, xPos: number = null, yPos: number = null) {
    this.checkAddPage();
    let x = 0;
    this.pdf.setFontSize(7);
    this.pdf.setFontType('bold');
    if (xPos === null) {
      switch (position) {
        case PdfPosition.Center:
          if (align === TextAlign.Left) {
            x = this.centerX();
          } else {
            x = (this.pdf.internal.pageSize.width / 2) - (this.textLenght(title) / 2);
          }

          break;
        case PdfPosition.Left:
          x = this.LeftX();
          break;
        case PdfPosition.Right:
          x = this.RigthX();
          break;
      }
    } else {
      x = xPos;
    }

    this.pdf.setTextColor(0, 0, 0);
    this.pdf.text(title, x, this.currentY + yPos);

  }

  addSubTitle(title: string, position: PdfPosition, align: TextAlign = TextAlign.Left, xPos: number = null) {
    this.checkAddPage();
    let x = 0;
    this.pdf.setFontSize(11);
    if (xPos === null) {
      switch (position) {
        case PdfPosition.Center:
          if (align === TextAlign.Left) {
            x = this.centerX();
          } else {
            x = (this.pdf.internal.pageSize.width / 2) - (this.textLenght(title) / 2);
          }

          break;
        case PdfPosition.Left:
          x = this.LeftX();
          break;
        case PdfPosition.Right:
          x = this.RigthX();
          break;
      }
    } else {
      x = xPos;
    }

    this.pdf.setTextColor(0, 88, 161);
    this.pdf.text(title, x, this.currentY);

  }

  addSpace(y: number) {
    this.currentY += y;
    this.checkAddPage();
  }

/*  addSpaceAxesX(x: number) {
    this.currentX += x;
    this.checkAddPage();
  }

  setCurrentX(x: number){
    this.currentX = x;
  }*/

  setCurrentY(y: number) {
    this.currentY = y;
  }

  hexToRgb(hex): any {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
      return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  addLine(position: PdfPosition, xPos: number = null, x2Pos: number = null) {
    this.checkAddPage();
    let x2 = 200;
    let x = 25;
    switch (position) {
      case PdfPosition.Complete:
        x2 = 600 - 25;
        break;
      case PdfPosition.Center:
        x2 = x2Pos === null ? 400 - 25 : x2Pos;
        x = xPos === null ? (this.pdf.internal.pageSize.width / 2) - (200 / 2) : xPos;
        break;
      case PdfPosition.Left:
        x2 = x2Pos === null ? 200 - 25 : x2Pos;
        break;
      case PdfPosition.Right:
        x2 = x2Pos === null ? 600 - 25 : x2Pos;
        x = xPos === null ? this.RigthX() : xPos;
        break;
    }
    this.pdf.setDrawColor(0, 88, 161);
    this.pdf.setLineWidth(1);
    this.pdf.line(x, this.currentY, x2, this.currentY);
  }

  addCircle(circleConfig: CircleConfig) {
    const color = this.hexToRgb(circleConfig.color);
    this.pdf.setDrawColor(color.r, color.g, color.b);
    this.pdf.setFillColor(color.r, color.g, color.b);
    this.pdf.circle(circleConfig.x, circleConfig.y, circleConfig.radio, 'FD');
  }

  addSquare(squareConfig: SquareConfig) {
    const color = this.hexToRgb(squareConfig.color);
    this.pdf.setDrawColor(color.r, color.g, color.b);
    this.pdf.setFillColor(color.r, color.g, color.b);
    this.pdf.rect(squareConfig.x, squareConfig.y, squareConfig.height, squareConfig.withd, 'FD');
  }

  addText(text: string, fontConfig: FontConfig = <FontConfig>{style: 'normal', color: '#00000', size: 15},
          position: TextPosition = <TextPosition> {y: 0, x: 0}, rotate: boolean = false) {
    this.checkAddPage();
    this.pdf.setFontSize(fontConfig.size);
    const color = this.hexToRgb(fontConfig.color);
    this.pdf.setTextColor(color.r, color.g, color.b);
    this.pdf.setFontStyle(fontConfig.style);
    if(rotate){
      this.pdf.text(text, position.x, position.y, null, -90);
    }else if(!rotate){
      this.pdf.text(text, position.x, position.y);
    }
    this.pdf.setFontStyle('normal');

  }

  addTable(cols: any[], rows: any[], position: PdfPosition, headerColor: any[] = [0, 88, 161], columnsStyles: any = {}, showHeader = 'firstPage', width: number = null, noDataText: string = 'No data recorded') {
    let right = 400;
    let left = 25;
    let tableWidth = 550;
    switch (position) {
      case PdfPosition.Complete:
        left = 25;
        right = 25;
        break;
      case PdfPosition.Center:
        left = 200;
        right = 200;
        tableWidth = width === null ? 175 : width;
        break;
      case PdfPosition.Right:
        left = 400;
        right = 25;
        tableWidth = width === null ? 175 : width;
        break;
      case PdfPosition.Left:
        left = 25;
        right = 400;
        tableWidth = width === null ? 175 : width;
        break;
    }

    if (rows.length === 0) {
      cols.push({title: '', dataKey: 'noData'});
      rows.push({noData: noDataText});
    }

    this.pdf.autoTable(cols, rows, {
      themes: 'striped',
      showHeader: showHeader,
      styles: {fillColor: false, fontSize: 7},
      headerStyles: {fillColor: headerColor, textColor: 255},
      columnStyles: columnsStyles,
      startY: this.currentY,
      margin: {right: right, left: left},
      pageBreak: 'auto',
      addPageContent: () => {
        this.currentY = 60;
      },
      tableWidth: tableWidth,
      drawCell: (row, data) => {
        if (data.column.dataKey === 'noData') {
          return false;
        }
      },
      drawRow: (row, data) => {
        if (row.cells.noData) {
          this.pdf.setFontSize(9);
          this.pdf.autoTableText(noDataText , data.settings.margin.left + data.table.width / 2, row.y + row.height / 2, {
            halign: 'center',
            valign: 'middle',
            fontSize: 9
          });
          data.cursor.y += 25;
          return false;
        }
      }
    });
  }

  checkAddSpaceX(contadorX: number){
    if(contadorX === 157.5){
      this.addXSpace = 0;
    }else{
      return;
    }
  }

  checkSplitArray(arrayPostion: number){
    if(arrayPostion <= 7){
      return 20;
    }else if(arrayPostion <= 14 && arrayPostion > 7){
      return 42.5;
    }else if(arrayPostion <= 21 && arrayPostion > 14){
      return 65;
    }else if(arrayPostion <= 28 && arrayPostion > 21){
      return 87.5;
    }else if(arrayPostion <= 35 && arrayPostion > 28){
      return 110;
    }else if(arrayPostion <= 42 && arrayPostion > 35){
      return 162.5;
    }else if(arrayPostion <= 49 && arrayPostion > 42){
      return 185;
    }else if(arrayPostion <= 56 && arrayPostion > 49){
      return 207.5;
    }else if(arrayPostion <= 63 && arrayPostion > 56){
      return 230;
    }else if(arrayPostion <= 70 && arrayPostion > 63){
      return 252.5;
    }
  }

  getSquareColor(styleName: string): string {
    switch (styleName) {
      case 'out': {
        return '#ff8de6';
      }
      case 'current': {
        return '#346aa9';
      }
      case 'in': {
        return '#5298eb';
      }
      default: {
        return '#dedede';
      }
    }
  }

  setupCalendarData(startDate: Date, endDate: Date, isStart: boolean) {
    this.startDate = new Date(startDate);
    this.endDate = new Date(endDate);
    this.isStart = isStart;

    if (this.startDate == null || this.endDate === null) {
      return;
    }

    if (this.isStart) {
      this.date = new Date(this.startDate);
    } else {
      this.date = new Date(this.endDate);
    }
    let m = moment(this.date).date(1);
    this.month = m.format('MMMM');
    this.year = m.format('YYYY');
    this.weekDays = moment.weekdaysShort();
    const mEnd = moment(this.endDate);
    const mStart = moment(this.startDate);

    this.show = (m.format('MM/YYYY') === mEnd.format('MM/YYYY') && this.isStart) ||
      moment(this.startDate).format('MM/YYYY') !== mEnd.format('MM/YYYY');

    if (this.show) {
      let inDay = false;
      const dayWeek = m.day();
      if (dayWeek > 1) {
        m = m.subtract(dayWeek, 'day');
      }
      for (let i = 0; i < 5; i++) {
        const week = <Week>{ days: []};
        this.weeks.push(week);
        for (let j = 0; j < 7; j++) {
          m = m.add(1, 'day');
          const day = {label: m.format('DD'), clazz: ''};
          if (m.isAfter(mStart)  && m.isBefore(mEnd)) {
            day.clazz = 'in';
          }
          if (m.isAfter(mEnd) && m.isAfter(mStart) && moment().isAfter(mEnd)) {
            day.clazz = 'out';
          }
          if (m.format( 'DDMMYYYY')  ===  moment(this.date).format( 'DDMMYYYY') ) {
            day.clazz = 'current';
          }
          if (m.format( 'DDMMYYYY') === mEnd.format( 'DDMMYYYY')) {
            day.clazz = 'current';
          }
          week.days.push(day);
        }
      }
    }
  }

  setupTitlePositionY(arrayPosition: number){
    if(arrayPosition <= 70){
      return 7;
    }else if(arrayPosition > 70){
      return 148;
    }
  }

  setupSubtitlePisitionY(arrayPosition: number){
    if(arrayPosition <= 70){
      return 18;
    }else if(arrayPosition > 70){
      return 160;
    }
  }

  checkAddTitleorSubtitle(arrayPosition: number){
    if(arrayPosition <= 70){
      return false;
    }else if(arrayPosition > 70){
      return true;
    }
  }

  drawCalendar(){
    let arrayPosition = 0;
    this.weeks.forEach((value) => {
      value.days.forEach((values) => {
        this.addXSpace += 22.5;
        arrayPosition ++;
        this.daysCount++;
          this.addSquare(<SquareConfig>{x: 340 + this.addXSpace, y: this.currentY + this.checkSplitArray(arrayPosition) , height: 20, withd: 20, color: this.getSquareColor(values.clazz)});
          this.addText(values.label, <FontConfig>{style: 'normal', color: '#000000', size: 10} , <TextPosition>{x: 345 + this.addXSpace , y: this.currentY + this.checkSplitArray(arrayPosition) + 15  });
          this.checkAddSpaceX(this.addXSpace);
      });
    });
    if(!this.checkAddTitleorSubtitle(this.daysCount)){
      this.addCalendarTitle(this.month + ' ' + this.year, PdfPosition.Center, '#000000', 395, 7 , false, 13, 'bold');
      this.addText('Start Date', <FontConfig>{style: 'normal', color: '#000000', size: 10} , <TextPosition>{x: 345, y: this.currentY + 60  }, true);
    }else if(this.checkAddTitleorSubtitle(this.daysCount)){
      this.addCalendarTitle(this.month + ' ' + this.year, PdfPosition.Center, '#000000', 395, this.setupTitlePositionY(this.daysCount) , false, 13, 'bold');
      this.addText('End Date', <FontConfig>{style: 'normal', color: '#000000', size: 10} , <TextPosition>{x: 345, y: this.currentY + 195}, true);
    }
    let counter = 0;
    this.weekDays.forEach((weekDay) => {
      counter += 23;
      if(!this.checkAddTitleorSubtitle(this.daysCount)){
        this.addCalendarWeekDays(weekDay, PdfPosition.Center, TextAlign.Center, 340 + counter, this.setupSubtitlePisitionY(this.daysCount));
      }else if(this.checkAddTitleorSubtitle(this.daysCount)){
        this.addCalendarWeekDays(weekDay, PdfPosition.Center, TextAlign.Center, 340 + counter, this.setupSubtitlePisitionY(this.daysCount));
        this.addCalendarWeekDays(weekDay, PdfPosition.Center, TextAlign.Center, 340 + counter, this.setupSubtitlePisitionY(this.daysCount));
      }
    });
  }

  save(name: string) {
    const datePipe = new DatePipe('en-US');
    const toDay = new Date();
    const fileSave = name + '-' + datePipe.transform(toDay, 'MM-dd-yyyy') + '.pdf'
    this.pdf.save(fileSave);
  }


}
