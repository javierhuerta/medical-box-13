import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { BoxStateModel } from "./boxes.models";
import { BoxRelease, CreatePatientAdmission, GetAllBoxes } from "./boxes.actions";
import { BoxService } from "src/app/box/box.service";
import { tap } from "rxjs";


@State<BoxStateModel>({
    name: 'EBox',
    defaults: {
        boxes: []
    }
})
@Injectable()
export class BoxState {

    @Selector()
    static boxList({ boxes }: BoxStateModel) {
        return boxes;
    }

    @Selector()
    static controlarDonAriel({ boxes }: BoxStateModel) {
        return boxes.find(box => box.doctor === 'Ariel Mamani');
    }

    @Selector()
    static boxAvailableList({ boxes }: BoxStateModel) {
        return boxes.filter(box => box.isAvailable);
    }

    constructor(private _boxService: BoxService) { }

    @Action(GetAllBoxes)
    getAllBoxes({ patchState }: StateContext<BoxStateModel>) {
        return this._boxService.getAllBoxes().pipe(tap((boxes) => {
            patchState({
                boxes
            })
        }));
    }

    @Action(CreatePatientAdmission)
    createPatientAdmission(ctx: StateContext<BoxStateModel>, { payload }: CreatePatientAdmission) {
        let data = ctx.getState().boxes.map(box => ({...box}));
        let box = data.find(box => box.id == payload.boxId);
        if (box === undefined) {
            console.log("No existen boxes con el id entregado");
            return null;
        }

        if (!box.isAvailable) {
            console.log("El box no se encuentra disponible");
            return null;
        }

        box.patient = payload.patient;
        box.comments = payload.comments;
        box.isAvailable = false;

        // Aqui actualizamos todo el estado de boxes solamente cambiando 1 box
        return ctx.patchState({ boxes: data });
    }

    @Action(BoxRelease)
    boxRelease({ getState, patchState }: StateContext<BoxStateModel>, { payload }: BoxRelease) {
        let data = getState().boxes.map(box => ({...box}));
        let box = data.find(box => box.id == payload.id);
        if (box === undefined) {
            console.log("No existen boxes con el id entregado");
            return null;
        }

        box.isAvailable = true;
        box.patient = undefined;
        box.comments = undefined;

        // Aqui actualizamos todo el estado de boxes solamente cambiando 1 box
        return patchState({ boxes: data });
    }
}