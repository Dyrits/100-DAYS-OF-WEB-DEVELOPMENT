const players = {
    "#1": { name: localStorage.getItem("#1") || "(Unknown) #1", icon: "X", _next: "#2" },
    "#2": { name: localStorage.getItem("#2") || "(Unknown) #2", icon: "O", _next: "#1" },
    _current: "#1",
    get current() { return this[this._current];},
    switchPlayer () { this._current = this.current._next;},
}

const game = {
    board: [["", "", ""], ["", "", ""], ["", "", ""],],
    round: 1
}
