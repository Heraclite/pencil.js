import test from "ava";
import Component from "./component";

test.beforeEach((t) => {
    t.context = new Component([0, 0]);
});

test("constructor", (t) => {
    t.false(t.context.isClicked);
    t.false(t.context.isHovered);
});

test("makePath", (t) => {
    t.context.trace = () => {};
    const ctx = {
        fill: () => t.pass(),
        stroke: () => t.pass(),
    };
    t.context.options = {
        fill: "123",
        stroke: "456",
        strokeWidth: 6,
        join: "a",
        cap: "b",
    };
    t.context.makePath(ctx);
    t.is(ctx.fillStyle, "123");
    t.is(ctx.strokeStyle, "456");
    t.is(ctx.lineWidth, 6);
    t.is(ctx.lineJoin, "a");
    t.is(ctx.lineCap, "b");
});

test("makePath skip", (t) => {
    t.context.trace = () => {};
    const ctx = {
        fill: () => t.fail(),
        stroke: () => t.fail(),
    };
    t.context.options.fill = null;
    t.context.options.stroke = null;
    t.context.makePath(ctx);
    t.context.options.stroke = "any";
    t.context.options.strokeWidth = 0;
    t.context.makePath(ctx);
    t.pass();
});

test("trace", (t) => {
    t.throws(() => t.context.trace(), ReferenceError);
});

test.todo("isHover");

test("isHover not shown", (t) => {
    t.context.options.shown = false;
    t.false(t.context.isHover([0, 0], null));
});

test("defaultOptions", (t) => {
    const options = Component.defaultOptions;
    t.is(options.fill, "#000");
    t.is(options.stroke, null);
    t.is(options.strokeWidth, 2);
    t.is(options.cursor, Component.cursors.default);
    t.is(options.join, Component.joins.miter);
});

test("cursors", (t) => {
    t.truthy(Component.cursors);
});

test("joins", (t) => {
    t.is(Component.joins.miter, "miter");
    t.is(Component.joins.round, "round");
    t.is(Component.joins.bevel, "bevel");
});
