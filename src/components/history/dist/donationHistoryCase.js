"use strict";
exports.__esModule = true;
exports.DonationHistoryCase = void 0;
var core_1 = require("@material-ui/core");
var react_redux_1 = require("react-redux");
var web3_1 = require("web3");
exports.DonationHistoryCase = function (props) {
    var donateHistories = react_redux_1.useSelector(function (state) { return state.app.caseDonateHistory; });
    var charities = react_redux_1.useSelector(function (state) { return state.app.allCharities; });
    return (React.createElement("div", { className: "my-20" },
        React.createElement("div", { className: "flex items-center" },
            React.createElement("p", { className: "py-10 font-bold text-28" }, "Your donations on this channel"),
            props.loading && (React.createElement("div", { className: "p-10 mx-20 flex items-center" },
                React.createElement(core_1.CircularProgress, { size: '2vh' })))),
        donateHistories.length == 0 && (React.createElement("p", null, "There is no donation on this case")),
        donateHistories.map(function (history, index) {
            var charityIndex = charities.findIndex(function (item) { return item.address === history.to; });
            return (React.createElement(core_1.Grid, { container: true, spacing: 1, key: index, className: "border p-5 " },
                React.createElement(core_1.Grid, { item: true, xs: 4, className: "overflow-hidden" }, charityIndex >= 0 ? charities[charityIndex].name : 'black charity'),
                React.createElement(core_1.Grid, { item: true, xs: 4, className: "overflow-hidden" }, history.currency),
                React.createElement(core_1.Grid, { item: true, xs: 4, className: "overflow-hidden" }, web3_1["default"].utils.fromWei(history.amount))));
        })));
};
