import assign from 'object-assign';

export default function applyDefaults(def, ctx) {
  return assign({}, def, ctx, {
    groups: assign(def.groups, ctx.groups),
    display: assign(def.display, ctx.display),
  });
}
