"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.DonationHistoryAll = void 0;
var core_1 = require("@material-ui/core");
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var web3_1 = require("web3");
var base_1 = require("../../core/constants/base");
var web3Context_1 = require("../../hooks/web3Context");
var networks_1 = require("../../networks");
var blankHistory = [];
exports.DonationHistoryAll = function (props) {
    var address = web3Context_1.useWeb3Context().address;
    var _a = react_1.useState(false), loading = _a[0], setLoading = _a[1];
    var _b = react_1.useState(blankHistory), histories = _b[0], setHistories = _b[1];
    var charities = react_redux_1.useSelector(function (state) { return state.app.allCharities; });
    var getLast20History = function () { return __awaiter(void 0, void 0, void 0, function () {
        var ddaContract, lastBlock, blockCountIteration, totalEvents, i, allEvents, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (address === '')
                        return [2 /*return*/];
                    setLoading(true);
                    ddaContract = base_1.getContract('DDAContract');
                    return [4 /*yield*/, base_1.connectWeb3.eth.getBlockNumber()];
                case 1:
                    lastBlock = _a.sent();
                    blockCountIteration = 5000;
                    totalEvents = [];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 8, , 9]);
                    i = lastBlock;
                    _a.label = 3;
                case 3:
                    if (!(i >= base_1.birthDDAContractNumber - blockCountIteration)) return [3 /*break*/, 7];
                    if (!(totalEvents.length < base_1.maximumAllDoantion)) return [3 /*break*/, 5];
                    return [4 /*yield*/, ddaContract.getPastEvents('Donate', {
                            'filter': {
                                '_from': address
                            },
                            'fromBlock': i - blockCountIteration + 1,
                            'toBlock': i
                        })];
                case 4:
                    allEvents = _a.sent();
                    allEvents.reverse().forEach(function (event) {
                        var currency = networks_1.tokenList.find(function (token) { return token.address[networks_1.FromNetwork] === event.returnValues._currency; });
                        var history = {
                            transaction: event.transactionHash,
                            from: event.returnValues._from,
                            to: event.returnValues._to,
                            currency: currency ? currency.name : '',
                            amount: event.returnValues.amount,
                            timeStamp: event.returnValues.timestamp
                        };
                        if (totalEvents.length < base_1.maximumAllDoantion)
                            totalEvents.push(history);
                    });
                    return [3 /*break*/, 6];
                case 5: return [3 /*break*/, 7];
                case 6:
                    i -= blockCountIteration;
                    return [3 /*break*/, 3];
                case 7: return [3 /*break*/, 9];
                case 8:
                    e_1 = _a.sent();
                    setLoading(false);
                    return [3 /*break*/, 9];
                case 9:
                    setLoading(false);
                    setHistories(totalEvents);
                    return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        getLast20History();
    }, [address]);
    return (React.createElement("div", { className: "my-20" },
        React.createElement("div", { className: "flex items-center" }, props.loading && (React.createElement("div", { className: "p-10 mx-20 flex items-center" },
            React.createElement(core_1.CircularProgress, { size: '2vh' })))),
        histories.map(function (history, index) {
            var charityIndex = charities.findIndex(function (item) { return item.address === history.to; });
            var wAddress = charities[charityIndex].address;
            return (React.createElement(core_1.Grid, { container: true, spacing: 1, key: index, className: "border-b-1 p-5 " },
                React.createElement(core_1.Grid, { item: true, xs: 4, className: "overflow-hidden text-center" }, charityIndex >= 0 ? (wAddress.slice(0, 7) + '.....' + wAddress.slice(wAddress.length - 5, wAddress.length)) : 'black charity'),
                React.createElement(core_1.Grid, { item: true, xs: 4, className: "overflow-hidden text-center" }, history.currency),
                React.createElement(core_1.Grid, { item: true, xs: 4, className: "overflow-hidden text-center" }, web3_1["default"].utils.fromWei(history.amount))));
        })));
};
