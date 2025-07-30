import { _getRouterData } from "../../router";

export default class ViewModel<P, VMS, D> {
  _params = _getRouterData<P>();
  _vms: VMS;
  _d: D;
}
