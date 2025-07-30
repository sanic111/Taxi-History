import React from "react";
import ViewModelState from "./ViewModelState";
import Vnmf from "@vnxjs/vnmf";
import _router, {_getRouterData} from "../../router";
import ViewModel from "./ViewModel";

type D = any;
export default abstract class ViewScreenController<
    P,
    VMS extends ViewModelState,
    VM extends ViewModel<P, VMS, D>
> extends React.Component<P, VMS> {
    constructor(props: P, viewModelState: VMS, viewModel: VM) {
        super(props);
        this.state = viewModelState;
        this._vm = viewModel;
        this._vm._vms = viewModelState;
        this._vm._d = this;
        this._vms._psu = (callback?: () => void) => {
            console.log(this._vms);
            this.setState(
                {
                    ...viewModelState,
                },
                callback
            );
        };
    }
    _vm: VM;

    get _vms(): VMS {
        return this.state;
    }
}
