import { Injectable } from '@angular/core';
import {fabric} from "fabric";
import {ReplaySubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FabricToThreeBridgeService {

  registeredElements: {[key: string]: fabric.Object} = {};

  canvasChanged$: Subject<fabric.Object[]> = new Subject();

  private _canvas?: fabric.Canvas;
  get canvas(): fabric.Canvas | undefined {
    return this._canvas;
  }
  set canvas(value: fabric.Canvas | undefined) {
    this._canvas = value;

    if(value){
      const cb = () => this.canvasChanged$.next(value.getObjects());
      value.on('object:added', cb);
      value.on('object:removed', cb);

      this.canvasSet$.next(value);
    }
  }

  canvasSet$: Subject<fabric.Canvas> = new ReplaySubject();

  constructor() { }

  addToCanvas(el: fabric.Object, id?: string) {
    if(id){
      (el as any).id = id;
      this.registeredElements[id] = el;
    }
    this.canvas?.add(el);
  }

  importCanvasFromJson(json: any) {
    //this.canvas?.clear();
    this.canvas?.loadFromJSON(
      json,
      this.canvas.renderAll.bind(this.canvas),
      (jo: any, fo: fabric.Object) => {
        this.addToCanvas(fo, jo.id);
      }
    );
  }

  exportCanvasToJson() {
    return this.canvas?.toJSON(['id']);
  }


}
