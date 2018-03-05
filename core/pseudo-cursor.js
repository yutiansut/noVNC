/*
 * noVNC: HTML5 VNC client
 * Copyright (C) 2018 the noVNC authors.
 * Licensed under MPL 2.0 (see LICENSE.txt)
 *
 * See README.md for usage and integration instructions.
 */

export default function PseudoCursor(boundingTarget, container) {
    this._boundingTarget = boundingTarget;
    this._canvas = document.createElement('canvas');
    this._canvas.classList.add('noVNC_pseudo_cursor');

    this._container = container;
    this._container.appendChild(this._canvas);

    this._drawCtx = this._canvas.getContext('2d');

    this._hotX = 0;
    this._hotY = 0;
}

PseudoCursor.prototype = {
    change: function(hotX, hotY, renderCallback) {
        this._drawCtx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        renderCallback(this._canvas);
        this._hotX = hotX;
        this._hotY = hotY;
    },
    move: function (relX, relY) {
        // TODO: do we need to cache this to avoid lots of garbage?
        var boundingRect = this._boundingTarget.getBoundingClientRect();

        // get the absolute X and Y, factoring in the hotspot
        var absX = boundingRect.left + relX - this._hotX;
        var absY = boundingRect.top + relY - this._hotY;

        this._canvas.style.top = Math.floor(absY) + "px";
        this._canvas.style.left = Math.floor(absX) + "px";
    }
};
