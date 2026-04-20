import { m as createLucideIcon, q as frame, s as cancelFrame, t as interpolate, v as supportsViewTimeline, w as supportsScrollTimeline, x as progress, y as velocityPerSecond, z as isHTMLElement, D as defaultOffset$1, G as clamp, J as noop, K as resize, L as frameData, N as useConstant, r as reactExports, O as useIsomorphicLayoutEffect, P as invariant, Q as motionValue, R as MotionConfigContext, S as collectMotionValues, b as useLiveSiteConfig, U as useListLiveMapMarkers, V as useListLiveCityGuideEntries, W as useListLiveExclusiveServices, Y as useReducedMotion, j as jsxRuntimeExports, H as Header, p as motion, Z as Sparkles, _ as Utensils, $ as Music, M as MapPin, a0 as Heart, a1 as Star, F as Footer, a2 as ChevronDown, n as ChevronRight, E as ExternalLink, a3 as Compass, a4 as Palette, a5 as useFileUrl, a6 as BookOpen, a7 as LoaderCircle, B as Badge, d as Button } from "./index-CNWEiOk7.js";
import { A as AnimatePresence, C as ChevronLeft } from "./index-DpRxBCet.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  [
    "path",
    {
      d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
      key: "1yiouv"
    }
  ],
  ["circle", { cx: "12", cy: "8", r: "6", key: "1vp47v" }]
];
const Award = createLucideIcon("award", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  [
    "path",
    {
      d: "M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z",
      key: "169xi5"
    }
  ],
  ["path", { d: "M15 5.764v15", key: "1pn4in" }],
  ["path", { d: "M9 3.236v15", key: "1uimfh" }]
];
const Map$1 = createLucideIcon("map", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z", key: "a7tn18" }]
];
const Moon = createLucideIcon("moon", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z", key: "hou9p0" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M16 10a4 4 0 0 1-8 0", key: "1ltviw" }]
];
const ShoppingBag = createLucideIcon("shopping-bag", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8", key: "n7qcjb" }],
  [
    "path",
    { d: "M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7", key: "d0u48b" }
  ],
  ["path", { d: "m2.1 21.8 6.4-6.3", key: "yn04lh" }],
  ["path", { d: "m19 5-7 7", key: "194lzd" }]
];
const UtensilsCrossed = createLucideIcon("utensils-crossed", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
const Zap = createLucideIcon("zap", __iconNode);
function observeTimeline(update, timeline) {
  let prevProgress;
  const onFrame = () => {
    const { currentTime } = timeline;
    const percentage = currentTime === null ? 0 : currentTime.value;
    const progress2 = percentage / 100;
    if (prevProgress !== progress2) {
      update(progress2);
    }
    prevProgress = progress2;
  };
  frame.preUpdate(onFrame, true);
  return () => cancelFrame(onFrame);
}
function transform(...args) {
  const useImmediate = !Array.isArray(args[0]);
  const argOffset = useImmediate ? 0 : -1;
  const inputValue = args[0 + argOffset];
  const inputRange = args[1 + argOffset];
  const outputRange = args[2 + argOffset];
  const options = args[3 + argOffset];
  const interpolator = interpolate(inputRange, outputRange, options);
  return useImmediate ? interpolator(inputValue) : interpolator;
}
function canUseNativeTimeline(target) {
  if (typeof window === "undefined")
    return false;
  return target ? supportsViewTimeline() : supportsScrollTimeline();
}
const maxElapsed = 50;
const createAxisInfo = () => ({
  current: 0,
  offset: [],
  progress: 0,
  scrollLength: 0,
  targetOffset: 0,
  targetLength: 0,
  containerLength: 0,
  velocity: 0
});
const createScrollInfo = () => ({
  time: 0,
  x: createAxisInfo(),
  y: createAxisInfo()
});
const keys = {
  x: {
    length: "Width",
    position: "Left"
  },
  y: {
    length: "Height",
    position: "Top"
  }
};
function updateAxisInfo(element, axisName, info, time) {
  const axis = info[axisName];
  const { length, position } = keys[axisName];
  const prev = axis.current;
  const prevTime = info.time;
  axis.current = Math.abs(element[`scroll${position}`]);
  axis.scrollLength = element[`scroll${length}`] - element[`client${length}`];
  axis.offset.length = 0;
  axis.offset[0] = 0;
  axis.offset[1] = axis.scrollLength;
  axis.progress = progress(0, axis.scrollLength, axis.current);
  const elapsed = time - prevTime;
  axis.velocity = elapsed > maxElapsed ? 0 : velocityPerSecond(axis.current - prev, elapsed);
}
function updateScrollInfo(element, info, time) {
  updateAxisInfo(element, "x", info, time);
  updateAxisInfo(element, "y", info, time);
  info.time = time;
}
function calcInset(element, container) {
  const inset = { x: 0, y: 0 };
  let current = element;
  while (current && current !== container) {
    if (isHTMLElement(current)) {
      inset.x += current.offsetLeft;
      inset.y += current.offsetTop;
      current = current.offsetParent;
    } else if (current.tagName === "svg") {
      const svgBoundingBox = current.getBoundingClientRect();
      current = current.parentElement;
      const parentBoundingBox = current.getBoundingClientRect();
      inset.x += svgBoundingBox.left - parentBoundingBox.left;
      inset.y += svgBoundingBox.top - parentBoundingBox.top;
    } else if (current instanceof SVGGraphicsElement) {
      const { x, y } = current.getBBox();
      inset.x += x;
      inset.y += y;
      let svg = null;
      let parent = current.parentNode;
      while (!svg) {
        if (parent.tagName === "svg") {
          svg = parent;
        }
        parent = current.parentNode;
      }
      current = svg;
    } else {
      break;
    }
  }
  return inset;
}
const namedEdges = {
  start: 0,
  center: 0.5,
  end: 1
};
function resolveEdge(edge, length, inset = 0) {
  let delta = 0;
  if (edge in namedEdges) {
    edge = namedEdges[edge];
  }
  if (typeof edge === "string") {
    const asNumber = parseFloat(edge);
    if (edge.endsWith("px")) {
      delta = asNumber;
    } else if (edge.endsWith("%")) {
      edge = asNumber / 100;
    } else if (edge.endsWith("vw")) {
      delta = asNumber / 100 * document.documentElement.clientWidth;
    } else if (edge.endsWith("vh")) {
      delta = asNumber / 100 * document.documentElement.clientHeight;
    } else {
      edge = asNumber;
    }
  }
  if (typeof edge === "number") {
    delta = length * edge;
  }
  return inset + delta;
}
const defaultOffset = [0, 0];
function resolveOffset(offset, containerLength, targetLength, targetInset) {
  let offsetDefinition = Array.isArray(offset) ? offset : defaultOffset;
  let targetPoint = 0;
  let containerPoint = 0;
  if (typeof offset === "number") {
    offsetDefinition = [offset, offset];
  } else if (typeof offset === "string") {
    offset = offset.trim();
    if (offset.includes(" ")) {
      offsetDefinition = offset.split(" ");
    } else {
      offsetDefinition = [offset, namedEdges[offset] ? offset : `0`];
    }
  }
  targetPoint = resolveEdge(offsetDefinition[0], targetLength, targetInset);
  containerPoint = resolveEdge(offsetDefinition[1], containerLength);
  return targetPoint - containerPoint;
}
const ScrollOffset = {
  Enter: [
    [0, 1],
    [1, 1]
  ],
  Exit: [
    [0, 0],
    [1, 0]
  ],
  Any: [
    [1, 0],
    [0, 1]
  ],
  All: [
    [0, 0],
    [1, 1]
  ]
};
const point = { x: 0, y: 0 };
function getTargetSize(target) {
  return "getBBox" in target && target.tagName !== "svg" ? target.getBBox() : { width: target.clientWidth, height: target.clientHeight };
}
function resolveOffsets(container, info, options) {
  const { offset: offsetDefinition = ScrollOffset.All } = options;
  const { target = container, axis = "y" } = options;
  const lengthLabel = axis === "y" ? "height" : "width";
  const inset = target !== container ? calcInset(target, container) : point;
  const targetSize = target === container ? { width: container.scrollWidth, height: container.scrollHeight } : getTargetSize(target);
  const containerSize = {
    width: container.clientWidth,
    height: container.clientHeight
  };
  info[axis].offset.length = 0;
  let hasChanged = !info[axis].interpolate;
  const numOffsets = offsetDefinition.length;
  for (let i = 0; i < numOffsets; i++) {
    const offset = resolveOffset(offsetDefinition[i], containerSize[lengthLabel], targetSize[lengthLabel], inset[axis]);
    if (!hasChanged && offset !== info[axis].interpolatorOffsets[i]) {
      hasChanged = true;
    }
    info[axis].offset[i] = offset;
  }
  if (hasChanged) {
    info[axis].interpolate = interpolate(info[axis].offset, defaultOffset$1(offsetDefinition), { clamp: false });
    info[axis].interpolatorOffsets = [...info[axis].offset];
  }
  info[axis].progress = clamp(0, 1, info[axis].interpolate(info[axis].current));
}
function measure(container, target = container, info) {
  info.x.targetOffset = 0;
  info.y.targetOffset = 0;
  if (target !== container) {
    let node = target;
    while (node && node !== container) {
      info.x.targetOffset += node.offsetLeft;
      info.y.targetOffset += node.offsetTop;
      node = node.offsetParent;
    }
  }
  info.x.targetLength = target === container ? target.scrollWidth : target.clientWidth;
  info.y.targetLength = target === container ? target.scrollHeight : target.clientHeight;
  info.x.containerLength = container.clientWidth;
  info.y.containerLength = container.clientHeight;
}
function createOnScrollHandler(element, onScroll, info, options = {}) {
  return {
    measure: (time) => {
      measure(element, options.target, info);
      updateScrollInfo(element, info, time);
      if (options.offset || options.target) {
        resolveOffsets(element, info, options);
      }
    },
    notify: () => onScroll(info)
  };
}
const scrollListeners = /* @__PURE__ */ new WeakMap();
const resizeListeners = /* @__PURE__ */ new WeakMap();
const onScrollHandlers = /* @__PURE__ */ new WeakMap();
const scrollSize = /* @__PURE__ */ new WeakMap();
const dimensionCheckProcesses = /* @__PURE__ */ new WeakMap();
const getEventTarget = (element) => element === document.scrollingElement ? window : element;
function scrollInfo(onScroll, { container = document.scrollingElement, trackContentSize = false, ...options } = {}) {
  if (!container)
    return noop;
  let containerHandlers = onScrollHandlers.get(container);
  if (!containerHandlers) {
    containerHandlers = /* @__PURE__ */ new Set();
    onScrollHandlers.set(container, containerHandlers);
  }
  const info = createScrollInfo();
  const containerHandler = createOnScrollHandler(container, onScroll, info, options);
  containerHandlers.add(containerHandler);
  if (!scrollListeners.has(container)) {
    const measureAll = () => {
      for (const handler of containerHandlers) {
        handler.measure(frameData.timestamp);
      }
      frame.preUpdate(notifyAll);
    };
    const notifyAll = () => {
      for (const handler of containerHandlers) {
        handler.notify();
      }
    };
    const listener2 = () => frame.read(measureAll);
    scrollListeners.set(container, listener2);
    const target = getEventTarget(container);
    window.addEventListener("resize", listener2);
    if (container !== document.documentElement) {
      resizeListeners.set(container, resize(container, listener2));
    }
    target.addEventListener("scroll", listener2);
    listener2();
  }
  if (trackContentSize && !dimensionCheckProcesses.has(container)) {
    const listener2 = scrollListeners.get(container);
    const size = {
      width: container.scrollWidth,
      height: container.scrollHeight
    };
    scrollSize.set(container, size);
    const checkScrollDimensions = () => {
      const newWidth = container.scrollWidth;
      const newHeight = container.scrollHeight;
      if (size.width !== newWidth || size.height !== newHeight) {
        listener2();
        size.width = newWidth;
        size.height = newHeight;
      }
    };
    const dimensionCheckProcess = frame.read(checkScrollDimensions, true);
    dimensionCheckProcesses.set(container, dimensionCheckProcess);
  }
  const listener = scrollListeners.get(container);
  frame.read(listener, false, true);
  return () => {
    var _a;
    cancelFrame(listener);
    const currentHandlers = onScrollHandlers.get(container);
    if (!currentHandlers)
      return;
    currentHandlers.delete(containerHandler);
    if (currentHandlers.size)
      return;
    const scrollListener = scrollListeners.get(container);
    scrollListeners.delete(container);
    if (scrollListener) {
      getEventTarget(container).removeEventListener("scroll", scrollListener);
      (_a = resizeListeners.get(container)) == null ? void 0 : _a();
      window.removeEventListener("resize", scrollListener);
    }
    const dimensionCheckProcess = dimensionCheckProcesses.get(container);
    if (dimensionCheckProcess) {
      cancelFrame(dimensionCheckProcess);
      dimensionCheckProcesses.delete(container);
    }
    scrollSize.delete(container);
  };
}
const presets = [
  [ScrollOffset.Enter, "entry"],
  [ScrollOffset.Exit, "exit"],
  [ScrollOffset.Any, "cover"],
  [ScrollOffset.All, "contain"]
];
const stringToProgress = {
  start: 0,
  end: 1
};
function parseStringOffset(s) {
  const parts = s.trim().split(/\s+/);
  if (parts.length !== 2)
    return void 0;
  const a = stringToProgress[parts[0]];
  const b = stringToProgress[parts[1]];
  if (a === void 0 || b === void 0)
    return void 0;
  return [a, b];
}
function normaliseOffset(offset) {
  if (offset.length !== 2)
    return void 0;
  const result = [];
  for (const item of offset) {
    if (Array.isArray(item)) {
      result.push(item);
    } else if (typeof item === "string") {
      const parsed = parseStringOffset(item);
      if (!parsed)
        return void 0;
      result.push(parsed);
    } else {
      return void 0;
    }
  }
  return result;
}
function matchesPreset(offset, preset) {
  const normalised = normaliseOffset(offset);
  if (!normalised)
    return false;
  for (let i = 0; i < 2; i++) {
    const o = normalised[i];
    const p = preset[i];
    if (o[0] !== p[0] || o[1] !== p[1])
      return false;
  }
  return true;
}
function offsetToViewTimelineRange(offset) {
  if (!offset) {
    return { rangeStart: "contain 0%", rangeEnd: "contain 100%" };
  }
  for (const [preset, name] of presets) {
    if (matchesPreset(offset, preset)) {
      return { rangeStart: `${name} 0%`, rangeEnd: `${name} 100%` };
    }
  }
  return void 0;
}
const timelineCache = /* @__PURE__ */ new Map();
function scrollTimelineFallback(options) {
  const currentTime = { value: 0 };
  const cancel = scrollInfo((info) => {
    currentTime.value = info[options.axis].progress * 100;
  }, options);
  return { currentTime, cancel };
}
function getTimeline({ source, container, ...options }) {
  const { axis } = options;
  if (source)
    container = source;
  let containerCache = timelineCache.get(container);
  if (!containerCache) {
    containerCache = /* @__PURE__ */ new Map();
    timelineCache.set(container, containerCache);
  }
  const targetKey = options.target ?? "self";
  let targetCache = containerCache.get(targetKey);
  if (!targetCache) {
    targetCache = {};
    containerCache.set(targetKey, targetCache);
  }
  const axisKey = axis + (options.offset ?? []).join(",");
  if (!targetCache[axisKey]) {
    if (options.target && canUseNativeTimeline(options.target)) {
      const range = offsetToViewTimelineRange(options.offset);
      if (range) {
        targetCache[axisKey] = new ViewTimeline({
          subject: options.target,
          axis
        });
      } else {
        targetCache[axisKey] = scrollTimelineFallback({
          container,
          ...options
        });
      }
    } else if (canUseNativeTimeline()) {
      targetCache[axisKey] = new ScrollTimeline({
        source: container,
        axis
      });
    } else {
      targetCache[axisKey] = scrollTimelineFallback({
        container,
        ...options
      });
    }
  }
  return targetCache[axisKey];
}
function attachToAnimation(animation, options) {
  const timeline = getTimeline(options);
  const range = options.target ? offsetToViewTimelineRange(options.offset) : void 0;
  const useNative = options.target ? canUseNativeTimeline(options.target) && !!range : canUseNativeTimeline();
  return animation.attachTimeline({
    timeline: useNative ? timeline : void 0,
    ...range && useNative && {
      rangeStart: range.rangeStart,
      rangeEnd: range.rangeEnd
    },
    observe: (valueAnimation) => {
      valueAnimation.pause();
      return observeTimeline((progress2) => {
        valueAnimation.time = valueAnimation.iterationDuration * progress2;
      }, timeline);
    }
  });
}
function isOnScrollWithInfo(onScroll) {
  return onScroll.length === 2;
}
function attachToFunction(onScroll, options) {
  if (isOnScrollWithInfo(onScroll)) {
    return scrollInfo((info) => {
      onScroll(info[options.axis].progress, info);
    }, options);
  } else {
    return observeTimeline(onScroll, getTimeline(options));
  }
}
function scroll(onScroll, { axis = "y", container = document.scrollingElement, ...options } = {}) {
  if (!container)
    return noop;
  const optionsWithDefaults = { axis, container, ...options };
  return typeof onScroll === "function" ? attachToFunction(onScroll, optionsWithDefaults) : attachToAnimation(onScroll, optionsWithDefaults);
}
const createScrollMotionValues = () => ({
  scrollX: motionValue(0),
  scrollY: motionValue(0),
  scrollXProgress: motionValue(0),
  scrollYProgress: motionValue(0)
});
const isRefPending = (ref) => {
  if (!ref)
    return false;
  return !ref.current;
};
function makeAccelerateConfig(axis, options, container, target) {
  return {
    factory: (animation) => scroll(animation, {
      ...options,
      axis,
      container: (container == null ? void 0 : container.current) || void 0,
      target: (target == null ? void 0 : target.current) || void 0
    }),
    times: [0, 1],
    keyframes: [0, 1],
    ease: (v) => v,
    duration: 1
  };
}
function canAccelerateScroll(target, offset) {
  if (typeof window === "undefined")
    return false;
  return target ? supportsViewTimeline() && !!offsetToViewTimelineRange(offset) : supportsScrollTimeline();
}
function useScroll({ container, target, ...options } = {}) {
  const values = useConstant(createScrollMotionValues);
  if (canAccelerateScroll(target, options.offset)) {
    values.scrollXProgress.accelerate = makeAccelerateConfig("x", options, container, target);
    values.scrollYProgress.accelerate = makeAccelerateConfig("y", options, container, target);
  }
  const scrollAnimation = reactExports.useRef(null);
  const needsStart = reactExports.useRef(false);
  const start = reactExports.useCallback(() => {
    scrollAnimation.current = scroll((_progress, { x, y }) => {
      values.scrollX.set(x.current);
      values.scrollXProgress.set(x.progress);
      values.scrollY.set(y.current);
      values.scrollYProgress.set(y.progress);
    }, {
      ...options,
      container: (container == null ? void 0 : container.current) || void 0,
      target: (target == null ? void 0 : target.current) || void 0
    });
    return () => {
      var _a;
      (_a = scrollAnimation.current) == null ? void 0 : _a.call(scrollAnimation);
    };
  }, [container, target, JSON.stringify(options.offset)]);
  useIsomorphicLayoutEffect(() => {
    needsStart.current = false;
    if (isRefPending(container) || isRefPending(target)) {
      needsStart.current = true;
      return;
    } else {
      return start();
    }
  }, [start]);
  reactExports.useEffect(() => {
    if (needsStart.current) {
      invariant(!isRefPending(container));
      invariant(!isRefPending(target));
      return start();
    } else {
      return;
    }
  }, [start]);
  return values;
}
function useMotionValue(initial) {
  const value = useConstant(() => motionValue(initial));
  const { isStatic } = reactExports.useContext(MotionConfigContext);
  if (isStatic) {
    const [, setLatest] = reactExports.useState(initial);
    reactExports.useEffect(() => value.on("change", setLatest), []);
  }
  return value;
}
function useCombineMotionValues(values, combineValues) {
  const value = useMotionValue(combineValues());
  const updateValue = () => value.set(combineValues());
  updateValue();
  useIsomorphicLayoutEffect(() => {
    const scheduleUpdate = () => frame.preRender(updateValue, false, true);
    const subscriptions = values.map((v) => v.on("change", scheduleUpdate));
    return () => {
      subscriptions.forEach((unsubscribe) => unsubscribe());
      cancelFrame(updateValue);
    };
  });
  return value;
}
function useComputed(compute) {
  collectMotionValues.current = [];
  compute();
  const value = useCombineMotionValues(collectMotionValues.current, compute);
  collectMotionValues.current = void 0;
  return value;
}
function useTransform(input, inputRangeOrTransformer, outputRangeOrMap, options) {
  if (typeof input === "function") {
    return useComputed(input);
  }
  const isOutputMap = outputRangeOrMap !== void 0 && !Array.isArray(outputRangeOrMap) && typeof inputRangeOrTransformer !== "function";
  if (isOutputMap) {
    return useMapTransform(input, inputRangeOrTransformer, outputRangeOrMap, options);
  }
  const outputRange = outputRangeOrMap;
  const transformer = typeof inputRangeOrTransformer === "function" ? inputRangeOrTransformer : transform(inputRangeOrTransformer, outputRange, options);
  const result = Array.isArray(input) ? useListTransform(input, transformer) : useListTransform([input], ([latest]) => transformer(latest));
  const inputAccelerate = !Array.isArray(input) ? input.accelerate : void 0;
  if (inputAccelerate && !inputAccelerate.isTransformed && typeof inputRangeOrTransformer !== "function" && Array.isArray(outputRangeOrMap) && (options == null ? void 0 : options.clamp) !== false) {
    result.accelerate = {
      ...inputAccelerate,
      times: inputRangeOrTransformer,
      keyframes: outputRangeOrMap,
      isTransformed: true,
      ...{}
    };
  }
  return result;
}
function useListTransform(values, transformer) {
  const latest = useConstant(() => []);
  return useCombineMotionValues(values, () => {
    latest.length = 0;
    const numValues = values.length;
    for (let i = 0; i < numValues; i++) {
      latest[i] = values[i].get();
    }
    return transformer(latest);
  });
}
function useMapTransform(inputValue, inputRange, outputMap, options) {
  const keys2 = useConstant(() => Object.keys(outputMap));
  const output = useConstant(() => ({}));
  for (const key of keys2) {
    output[key] = useTransform(inputValue, inputRange, outputMap[key], options);
  }
  return output;
}
const iconMap = {
  star: Star,
  award: Award,
  heart: Heart,
  zap: Zap,
  mapPin: MapPin,
  music: Music,
  utensils: Utensils,
  sparkles: Sparkles
};
const categoryColorMap = {
  Dining: "#C9A84C",
  "Art & Culture": "#9B59B6",
  Nightlife: "#4B6FC9",
  Shopping: "#27AE60",
  Local: "#16A085"
};
const categoryIconMap = {
  Dining: UtensilsCrossed,
  "Art & Culture": Palette,
  Nightlife: Moon,
  Shopping: ShoppingBag,
  Local: Compass
};
function ParallaxHero({
  title,
  description,
  backgroundImage,
  accentColor
}) {
  const ref = reactExports.useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ["0%", "0%"] : ["0%", "30%"]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref,
      className: "relative h-[60vh] min-h-[400px] overflow-hidden",
      "data-ocid": "experience-hero",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "absolute inset-0 scale-110 bg-cover bg-center",
            style: { backgroundImage: `url(${backgroundImage})`, y },
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0",
            style: {
              background: "linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.42) 100%)"
            },
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex h-full flex-col items-center justify-center px-4 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.h1,
            {
              initial: { opacity: 0, y: 30 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.8, ease: "easeOut" },
              className: "mb-4 font-serif text-4xl font-light text-white drop-shadow-lg md:text-6xl lg:text-7xl",
              children: title
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { scaleX: 0 },
              animate: { scaleX: 1 },
              transition: { duration: 0.6, delay: 0.4 },
              className: "mx-auto mb-5 h-0.5 w-24 origin-center",
              style: { backgroundColor: accentColor }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 0.6, duration: 0.6 },
              className: "max-w-2xl text-lg font-light text-white/90 drop-shadow",
              children: description
            }
          )
        ] })
      ]
    }
  );
}
function SectionPanel({
  id,
  title,
  description,
  images,
  videos,
  isExpanded,
  onToggle,
  accentColor,
  textColor,
  headerTextColor,
  defaultImage,
  index
}) {
  const [galleryIdx, setGalleryIdx] = reactExports.useState(0);
  const shouldReduceMotion = useReducedMotion();
  const bgImages = images.length > 0 ? images : [defaultImage];
  const iconKey = title.toLowerCase().includes("location") ? "mapPin" : title.toLowerCase().includes("culture") || title.toLowerCase().includes("nightlife") ? "music" : title.toLowerCase().includes("gastronomy") || title.toLowerCase().includes("food") ? "utensils" : "sparkles";
  const IconComponent = iconMap[iconKey] ?? Sparkles;
  const sectionInitial = shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 40 };
  const sectionAnimate = { opacity: 1, y: 0 };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: sectionInitial,
      whileInView: sectionAnimate,
      viewport: { once: true, margin: "-80px" },
      transition: { duration: 0.6, ease: "easeInOut", delay: index * 0.1 },
      className: "overflow-hidden rounded-2xl shadow-lg",
      style: { background: "rgba(255,255,255,0.97)" },
      "data-ocid": `experience-section-${id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.button,
          {
            className: "flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left",
            onClick: onToggle,
            whileHover: shouldReduceMotion ? {} : { scale: 1.003 },
            transition: { duration: 0.2 },
            "aria-expanded": isExpanded,
            style: {
              background: isExpanded ? `${accentColor}10` : "transparent",
              border: "none"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 items-center gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-full",
                    style: { backgroundColor: `${accentColor}20` },
                    animate: shouldReduceMotion ? {} : { scale: isExpanded ? 1.1 : 1 },
                    transition: { duration: 0.3 },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconComponent, { className: "h-6 w-6", style: { color: accentColor } })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h2",
                    {
                      className: "truncate font-serif text-2xl font-light md:text-3xl",
                      style: { color: headerTextColor },
                      children: title
                    }
                  ),
                  !isExpanded && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "mt-0.5 line-clamp-1 text-sm opacity-70",
                      style: { color: textColor },
                      children: description
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  animate: { rotate: isExpanded ? 180 : 0 },
                  transition: { duration: 0.35 },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ChevronDown,
                    {
                      className: "h-6 w-6 shrink-0",
                      style: { color: accentColor }
                    }
                  )
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: isExpanded && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { height: 0, opacity: 0 },
            animate: { height: "auto", opacity: 1 },
            exit: { height: 0, opacity: 0 },
            transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
            className: "overflow-hidden",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "space-y-6 border-t px-6 pb-8 pt-6",
                style: { borderColor: `${accentColor}20` },
                children: [
                  bgImages.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.div,
                    {
                      initial: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 },
                      animate: { opacity: 1, scale: 1 },
                      transition: { delay: 0.05, duration: 0.45 },
                      className: "relative overflow-hidden rounded-xl",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative aspect-video overflow-hidden rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          motion.img,
                          {
                            src: bgImages[galleryIdx],
                            alt: `${title} — view ${galleryIdx + 1}`,
                            className: "h-full w-full object-cover",
                            initial: { opacity: 0, x: 20 },
                            animate: { opacity: 1, x: 0 },
                            exit: { opacity: 0, x: -20 },
                            transition: { duration: 0.3 },
                            loading: "lazy",
                            onError: (e) => {
                              const t = e.target;
                              if (t.src !== defaultImage) t.src = defaultImage;
                            }
                          },
                          galleryIdx
                        ) }) }),
                        bgImages.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "button",
                            {
                              type: "button",
                              onClick: () => setGalleryIdx(
                                (i) => (i - 1 + bgImages.length) % bgImages.length
                              ),
                              className: "absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-110",
                              style: { backgroundColor: `${accentColor}CC` },
                              "aria-label": "Previous image",
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-5 w-5 text-white" })
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "button",
                            {
                              type: "button",
                              onClick: () => setGalleryIdx((i) => (i + 1) % bgImages.length),
                              className: "absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-110",
                              style: { backgroundColor: `${accentColor}CC` },
                              "aria-label": "Next image",
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-5 w-5 text-white" })
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5", children: bgImages.map((imgUrl, dotIdx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "button",
                            {
                              type: "button",
                              onClick: () => setGalleryIdx(dotIdx),
                              className: "h-2 w-2 rounded-full transition-all",
                              style: {
                                backgroundColor: dotIdx === galleryIdx ? accentColor : "rgba(255,255,255,0.6)"
                              },
                              "aria-label": `Go to image ${dotIdx + 1}`
                            },
                            imgUrl
                          )) })
                        ] })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.p,
                    {
                      initial: { opacity: 0, y: shouldReduceMotion ? 0 : 10 },
                      animate: { opacity: 1, y: 0 },
                      transition: { delay: 0.25, duration: 0.4 },
                      className: "text-lg leading-relaxed",
                      style: { color: textColor },
                      children: description
                    }
                  ),
                  videos.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      initial: { opacity: 0 },
                      animate: { opacity: 1 },
                      transition: { delay: 0.35 },
                      className: `grid gap-4 ${videos.length === 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"}`,
                      children: videos.map((video) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "overflow-hidden rounded-xl shadow-md",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "video",
                            {
                              src: video,
                              controls: true,
                              loop: true,
                              className: "h-full w-full",
                              style: { maxHeight: "400px" },
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("track", { kind: "captions" }),
                                "Your browser does not support the video tag."
                              ]
                            }
                          )
                        },
                        video
                      ))
                    }
                  )
                ]
              }
            )
          },
          "content"
        ) })
      ]
    }
  );
}
function ParallaxPanel({
  children,
  backgroundImage,
  accentColor,
  className = ""
}) {
  const ref = reactExports.useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ["0%", "0%"] : ["-8%", "8%"]
  );
  if (!backgroundImage) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className, ref, children });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref, className: `relative overflow-hidden ${className}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: "absolute inset-0 scale-110 bg-cover bg-center opacity-10",
        style: { backgroundImage: `url(${backgroundImage})`, y },
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute inset-0 opacity-5",
        style: { backgroundColor: accentColor },
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10", children })
  ] });
}
const PALERMO_LAT = -34.5875;
const PALERMO_LNG = -58.4227;
const PALERMO_ZOOM = 14;
function toPixel(lat, lng, containerW, containerH) {
  const latRange = [PALERMO_LAT - 0.025, PALERMO_LAT + 0.025];
  const lngRange = [PALERMO_LNG - 0.04, PALERMO_LNG + 0.04];
  const x = (lng - lngRange[0]) / (lngRange[1] - lngRange[0]) * containerW;
  const y = (latRange[1] - lat) / (latRange[1] - latRange[0]) * containerH;
  return { x, y };
}
function MapSection({
  markers,
  accentColor,
  textColor,
  headerTextColor
}) {
  const [activeMarker, setActiveMarker] = reactExports.useState(null);
  const containerRef = reactExports.useRef(null);
  const [dims, setDims] = reactExports.useState({ w: 800, h: 500 });
  const shouldReduceMotion = useReducedMotion();
  reactExports.useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        setDims({
          w: containerRef.current.offsetWidth,
          h: containerRef.current.offsetHeight
        });
      }
    };
    update();
    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${PALERMO_LNG - 0.04}%2C${PALERMO_LAT - 0.025}%2C${PALERMO_LNG + 0.04}%2C${PALERMO_LAT + 0.025}&layer=mapnik&zoom=${PALERMO_ZOOM}`;
  const visibleMarkers = markers.filter((m) => m.visible);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 40 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-80px" },
      transition: { duration: 0.6, ease: "easeInOut" },
      className: "overflow-hidden rounded-2xl shadow-xl",
      "data-ocid": "experience-map",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "px-6 pb-4 pt-6",
            style: { background: "rgba(255,255,255,0.97)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "flex h-10 w-10 items-center justify-center rounded-full",
                    style: { backgroundColor: `${accentColor}20` },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Map$1, { className: "h-5 w-5", style: { color: accentColor } })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h2",
                    {
                      className: "font-serif text-2xl font-light",
                      style: { color: headerTextColor },
                      children: "Palermo Hollywood"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm opacity-70", style: { color: textColor }, children: "Explore our neighborhood" })
                ] })
              ] }),
              visibleMarkers.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 flex flex-wrap gap-2", children: Array.from(new Set(visibleMarkers.map((m) => m.category))).map(
                (cat) => {
                  const color = categoryColorMap[cat] ?? accentColor;
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium",
                      style: { backgroundColor: `${color}18`, color },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "inline-block h-2 w-2 rounded-full",
                            style: { backgroundColor: color }
                          }
                        ),
                        cat
                      ]
                    },
                    cat
                  );
                }
              ) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            ref: containerRef,
            className: "relative",
            style: { height: "clamp(320px, 45vw, 500px)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "iframe",
                {
                  title: "Palermo Hollywood Map",
                  src: mapUrl,
                  className: "h-full w-full border-0",
                  loading: "lazy",
                  allowFullScreen: true,
                  style: { filter: "sepia(8%) contrast(95%)" }
                }
              ),
              visibleMarkers.map((marker) => {
                const { x, y } = toPixel(marker.lat, marker.lng, dims.w, dims.h);
                const color = categoryColorMap[marker.category] ?? accentColor;
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    className: "absolute -translate-x-1/2 -translate-y-full",
                    style: {
                      left: x,
                      top: y,
                      zIndex: 10,
                      border: "none",
                      background: "none",
                      padding: 0
                    },
                    onClick: () => setActiveMarker((activeMarker == null ? void 0 : activeMarker.id) === marker.id ? null : marker),
                    "aria-label": marker.name,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.div,
                      {
                        whileHover: shouldReduceMotion ? {} : { scale: 1.2 },
                        className: "flex h-8 w-8 items-center justify-center rounded-full border-2 border-white shadow-lg",
                        style: { backgroundColor: color },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-white", children: marker.category.charAt(0) })
                      }
                    )
                  },
                  marker.id
                );
              }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: activeMarker && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: -8, scale: 0.95 },
                  animate: { opacity: 1, y: 0, scale: 1 },
                  exit: { opacity: 0, scale: 0.9 },
                  className: "absolute bottom-4 left-4 right-4 z-20 rounded-xl p-4 shadow-2xl md:left-auto md:right-4 md:w-72",
                  style: { backgroundColor: "rgba(255,255,255,0.97)" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex items-start justify-between gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "mb-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium",
                            style: {
                              backgroundColor: `${categoryColorMap[activeMarker.category] ?? accentColor}20`,
                              color: categoryColorMap[activeMarker.category] ?? accentColor
                            },
                            children: activeMarker.category
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "h4",
                          {
                            className: "font-serif text-lg font-medium leading-tight",
                            style: { color: headerTextColor },
                            children: activeMarker.name
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => setActiveMarker(null),
                          className: "shrink-0 rounded-full p-1 transition-colors hover:bg-black/5",
                          "aria-label": "Close",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg leading-none opacity-50", children: "×" })
                        }
                      )
                    ] }),
                    activeMarker.address && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "mb-1 text-xs opacity-60",
                        style: { color: textColor },
                        children: activeMarker.address
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-sm leading-relaxed opacity-80",
                        style: { color: textColor },
                        children: activeMarker.description
                      }
                    ),
                    activeMarker.website && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "a",
                      {
                        href: activeMarker.website,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "mt-3 inline-flex items-center gap-1 text-xs font-medium transition-opacity hover:opacity-70",
                        style: { color: accentColor },
                        children: [
                          "Visit website ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3 w-3" })
                        ]
                      }
                    )
                  ]
                },
                activeMarker.id
              ) })
            ]
          }
        )
      ]
    }
  );
}
function CityGuideEntryCard({
  entry,
  catColor,
  headerTextColor,
  textColor,
  delay
}) {
  const { data: imageUrl } = useFileUrl(entry.imageKey ?? "");
  const shouldReduceMotion = useReducedMotion();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      transition: { delay, duration: 0.35 },
      className: "overflow-hidden rounded-xl border",
      style: { borderColor: `${catColor}20` },
      children: [
        imageUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-video overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: imageUrl,
            alt: entry.title,
            className: "h-full w-full object-cover transition-transform duration-500 hover:scale-105",
            loading: "lazy"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h4",
            {
              className: "mb-1 font-serif text-base font-medium",
              style: { color: headerTextColor },
              children: entry.title
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "line-clamp-3 text-sm leading-relaxed opacity-75",
              style: { color: textColor },
              children: entry.description
            }
          ),
          entry.externalLink && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: entry.externalLink,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "mt-2 inline-flex items-center gap-1 text-xs font-medium transition-opacity hover:opacity-70",
              style: { color: catColor },
              children: [
                "Explore ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3 w-3" })
              ]
            }
          )
        ] })
      ]
    }
  );
}
function CityGuidePdfSection({
  pdfKey,
  accentColor,
  headerTextColor,
  textColor
}) {
  const { data: pdfUrl, isLoading } = useFileUrl(pdfKey);
  const shouldReduceMotion = useReducedMotion();
  if (!pdfUrl && !isLoading) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.section,
    {
      initial: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 40 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-80px" },
      transition: { duration: 0.6, ease: "easeInOut" },
      className: "overflow-hidden rounded-2xl shadow-xl",
      "data-ocid": "city-guide-pdf",
      style: { background: "rgba(255,255,255,0.97)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 pb-4 pt-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex h-10 w-10 items-center justify-center rounded-full",
                style: { backgroundColor: `${accentColor}20` },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-5 w-5", style: { color: accentColor } })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h2",
                {
                  className: "font-serif text-2xl font-light",
                  style: { color: headerTextColor },
                  children: "Buenos Aires City Guide"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm opacity-70", style: { color: textColor }, children: "Our curated guide to exploring the city" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "mb-4 h-0.5 w-16",
              style: { backgroundColor: accentColor }
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 pb-6", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex h-[500px] items-center justify-center rounded-xl",
            style: { backgroundColor: `${accentColor}08` },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                LoaderCircle,
                {
                  className: "mx-auto mb-2 h-8 w-8 animate-spin",
                  style: { color: accentColor }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm opacity-60", style: { color: textColor }, children: "Loading city guide…" })
            ] })
          }
        ) : pdfUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "overflow-hidden rounded-xl border",
            style: { borderColor: `${accentColor}20` },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "iframe",
              {
                src: pdfUrl,
                width: "100%",
                height: "600px",
                style: { border: "none", display: "block" },
                title: "City Guide PDF",
                "data-ocid": "city-guide-pdf-viewer"
              }
            )
          }
        ) : null })
      ]
    }
  );
}
function CityGuideSection({
  entries,
  accentColor,
  textColor,
  headerTextColor
}) {
  const [openCats, setOpenCats] = reactExports.useState(/* @__PURE__ */ new Set());
  const shouldReduceMotion = useReducedMotion();
  const visible = entries.filter((e) => e.visible);
  const grouped = visible.reduce((acc, e) => {
    if (!acc[e.category]) acc[e.category] = [];
    acc[e.category].push(e);
    return acc;
  }, {});
  if (visible.length === 0) return null;
  const toggle = (cat) => {
    setOpenCats((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.section,
    {
      initial: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 40 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-80px" },
      transition: { duration: 0.6, ease: "easeInOut" },
      className: "space-y-4",
      "data-ocid": "city-guide",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h2",
            {
              className: "mb-3 font-serif text-3xl font-light md:text-4xl",
              style: { color: headerTextColor },
              children: "Discover Buenos Aires"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "mx-auto h-0.5 w-16",
              style: { backgroundColor: accentColor }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-base opacity-70", style: { color: textColor }, children: "Our curated guide to the best Palermo has to offer" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: Object.entries(grouped).map(([cat, items], catIdx) => {
          const isOpen = openCats.has(cat);
          const CatIcon = categoryIconMap[cat] ?? Compass;
          const catColor = categoryColorMap[cat] ?? accentColor;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, margin: "-80px" },
              transition: {
                delay: catIdx * 0.07,
                duration: 0.4,
                ease: "easeInOut"
              },
              className: "overflow-hidden rounded-2xl shadow-sm",
              style: { background: "rgba(255,255,255,0.97)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    className: "flex w-full items-center justify-between gap-4 px-6 py-4 text-left",
                    onClick: () => toggle(cat),
                    "aria-expanded": isOpen,
                    "data-ocid": `city-guide-cat-${cat.toLowerCase().replace(/\s+/g, "-")}`,
                    style: { border: "none", background: "none" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "flex h-9 w-9 items-center justify-center rounded-full",
                            style: { backgroundColor: `${catColor}18` },
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(CatIcon, { className: "h-5 w-5", style: { color: catColor } })
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "font-serif text-xl font-light",
                            style: { color: headerTextColor },
                            children: cat
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "span",
                          {
                            className: "text-sm opacity-50",
                            style: { color: textColor },
                            children: [
                              "(",
                              items.length,
                              ")"
                            ]
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        motion.div,
                        {
                          animate: { rotate: isOpen ? 180 : 0 },
                          transition: { duration: 0.3 },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            ChevronDown,
                            {
                              className: "h-5 w-5",
                              style: { color: catColor }
                            }
                          )
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { height: 0, opacity: 0 },
                    animate: { height: "auto", opacity: 1 },
                    exit: { height: 0, opacity: 0 },
                    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
                    className: "overflow-hidden",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 px-6 pb-6 pt-2 sm:grid-cols-2 lg:grid-cols-3", children: items.map((entry, ei) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      CityGuideEntryCard,
                      {
                        entry,
                        catColor,
                        headerTextColor,
                        textColor,
                        delay: ei * 0.06
                      },
                      entry.id
                    )) })
                  }
                ) })
              ]
            },
            cat
          );
        }) })
      ]
    }
  );
}
function ExclusiveServiceCard({
  service,
  accentColor,
  textColor,
  headerTextColor,
  delay
}) {
  const { data: imageUrl } = useFileUrl(service.imageKey ?? "");
  const shouldReduceMotion = useReducedMotion();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-80px" },
      transition: { delay, duration: 0.45, ease: "easeInOut" },
      whileHover: shouldReduceMotion ? {} : { y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" },
      className: "group overflow-hidden rounded-2xl shadow-md transition-shadow duration-300",
      style: { background: "rgba(255,255,255,0.97)" },
      "data-ocid": `service-card-${service.id}`,
      children: [
        imageUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-video overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: imageUrl,
            alt: service.name,
            className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105",
            loading: "lazy"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                style: { backgroundColor: `${accentColor}18` },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4", style: { color: accentColor } })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h3",
                {
                  className: "font-serif text-lg font-light leading-tight",
                  style: { color: headerTextColor },
                  children: service.name
                }
              ),
              service.category && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: "mt-0.5 text-xs",
                  style: {
                    borderColor: `${accentColor}40`,
                    color: accentColor
                  },
                  children: service.category
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "mb-3 text-sm leading-relaxed opacity-75",
              style: { color: textColor },
              children: service.description
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
            service.priceInfo && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-sm font-medium",
                style: { color: accentColor },
                children: service.priceInfo
              }
            ),
            service.requestLink && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: service.requestLink,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "ml-auto",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    size: "sm",
                    className: "text-xs",
                    style: {
                      borderColor: accentColor,
                      color: accentColor
                    },
                    children: "Inquire"
                  }
                )
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function ExclusiveServicesSection({
  services,
  accentColor,
  textColor,
  headerTextColor
}) {
  const visible = services.filter((s) => s.visible);
  const shouldReduceMotion = useReducedMotion();
  if (visible.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.section,
    {
      initial: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 40 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-80px" },
      transition: { duration: 0.6, ease: "easeInOut" },
      className: "pt-4",
      "data-ocid": "exclusive-services",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h2",
            {
              className: "mb-3 font-serif text-3xl font-light md:text-4xl",
              style: { color: headerTextColor },
              children: "Exclusive Services"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "mx-auto h-0.5 w-16",
              style: { backgroundColor: accentColor }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-base opacity-70", style: { color: textColor }, children: "Bespoke experiences crafted for our guests" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3", children: visible.map((service, si) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          ExclusiveServiceCard,
          {
            service,
            accentColor,
            textColor,
            headerTextColor,
            delay: si * 0.08
          },
          service.id
        )) })
      ]
    }
  );
}
const DEFAULT_SECTIONS = [
  {
    id: "location",
    title: "Central Location",
    description: "In the heart of Palermo Hollywood, surrounded by culture and history. All major attractions are within walking distance.",
    images: ["/assets/generated/cultural-district-street.jpg"],
    videos: [],
    isActive: true,
    order: 0n,
    animationType: "fade",
    layout: "grid"
  },
  {
    id: "culture",
    title: "Culture & Nightlife",
    description: "Experience tango shows, live music, and the vibrant nightlife of the Argentine capital.",
    images: ["/assets/generated/buenos-aires-sunset-skyline.jpg"],
    videos: [],
    isActive: true,
    order: 1n,
    animationType: "fade",
    layout: "grid"
  },
  {
    id: "gastronomy",
    title: "Gastronomy",
    description: "Discover world-class restaurants, authentic parrillas, and exquisite wine bars in the immediate vicinity.",
    images: ["/assets/generated/lifestyle-wine-balcony.jpg"],
    videos: [],
    isActive: true,
    order: 2n,
    animationType: "fade",
    layout: "grid"
  },
  {
    id: "exclusive",
    title: "Exclusive Services",
    description: "Personal concierge service, private city tours, and curated experiences for our guests.",
    images: ["/assets/generated/curated-living-space.jpg"],
    videos: [],
    isActive: true,
    order: 3n,
    animationType: "fade",
    layout: "grid"
  }
];
function ExperiencePage() {
  var _a, _b, _c, _d, _e;
  const { data: siteConfig } = useLiveSiteConfig();
  const { data: mapMarkers = [] } = useListLiveMapMarkers();
  const { data: cityGuideEntries = [] } = useListLiveCityGuideEntries();
  const { data: exclusiveServices = [] } = useListLiveExclusiveServices();
  const [expandedSection, setExpandedSection] = reactExports.useState(null);
  const shouldReduceMotion = useReducedMotion();
  const textColor = ((_a = siteConfig == null ? void 0 : siteConfig.experiencePage) == null ? void 0 : _a.textColor) || (siteConfig == null ? void 0 : siteConfig.textColor) || "#4A4A4A";
  const headerTextColor = (siteConfig == null ? void 0 : siteConfig.headerTextColor) || "#1A1A1A";
  const accentColor = (siteConfig == null ? void 0 : siteConfig.accentColor) || "#C9A84C";
  const backgroundColor = ((_b = siteConfig == null ? void 0 : siteConfig.experiencePage) == null ? void 0 : _b.backgroundColor) || "#F9F7F4";
  const highlights = reactExports.useMemo(
    () => {
      var _a2;
      return (((_a2 = siteConfig == null ? void 0 : siteConfig.experiencePage) == null ? void 0 : _a2.highlights) || []).filter((h) => h.isActive);
    },
    [siteConfig]
  );
  const activeSections = reactExports.useMemo(() => {
    var _a2;
    const cfg = ((_a2 = siteConfig == null ? void 0 : siteConfig.experiencePage) == null ? void 0 : _a2.sections) || [];
    const sorted = cfg.filter((s) => s.isActive).sort((a, b) => Number(a.order) - Number(b.order));
    return sorted.length > 0 ? sorted : DEFAULT_SECTIONS;
  }, [siteConfig]);
  const cityGuidePdfKey = reactExports.useMemo(
    () => {
      var _a2;
      return ((_a2 = cityGuideEntries.find((e) => e.pdfKey)) == null ? void 0 : _a2.pdfKey) ?? "";
    },
    [cityGuideEntries]
  );
  const defaultImage = "/assets/generated/hero-apartment-interior.jpg";
  const heroImage = ((_c = siteConfig == null ? void 0 : siteConfig.experiencePage) == null ? void 0 : _c.backgroundImage) || (siteConfig == null ? void 0 : siteConfig.defaultExperienceImage) || "/assets/generated/cultural-district-street.jpg";
  const title = ((_d = siteConfig == null ? void 0 : siteConfig.experiencePage) == null ? void 0 : _d.title) || "The Aura Experience";
  const description = ((_e = siteConfig == null ? void 0 : siteConfig.experiencePage) == null ? void 0 : _e.description) || "More than just accommodation – a world-class lifestyle experience";
  reactExports.useEffect(() => {
    if (siteConfig) {
      document.body.style.backgroundColor = backgroundColor;
      document.documentElement.style.setProperty(
        "--dynamic-text-color",
        textColor
      );
      document.documentElement.style.setProperty(
        "--dynamic-header-color",
        headerTextColor
      );
      document.documentElement.style.setProperty(
        "--dynamic-accent-color",
        accentColor
      );
    }
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [siteConfig, backgroundColor, textColor, headerTextColor, accentColor]);
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeInOut" }
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen", style: { backgroundColor }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ParallaxHero,
        {
          title,
          description,
          backgroundImage: heroImage,
          accentColor
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto space-y-16 px-4 py-16", children: [
        highlights.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            variants: containerVariants,
            initial: "hidden",
            whileInView: "visible",
            viewport: { once: true, margin: "-80px" },
            className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-4",
            "data-ocid": "highlights-grid",
            children: highlights.map((h) => {
              const IconComponent = iconMap[h.icon] ?? Sparkles;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  variants: itemVariants,
                  className: "group rounded-2xl p-6 text-center shadow-sm transition-shadow hover:shadow-lg",
                  style: { background: "rgba(255,255,255,0.97)" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110",
                        style: { backgroundColor: `${accentColor}18` },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          IconComponent,
                          {
                            className: "h-7 w-7",
                            style: { color: accentColor }
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "h3",
                      {
                        className: "mb-2 font-serif text-lg font-light",
                        style: { color: headerTextColor },
                        children: h.title
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-sm leading-relaxed opacity-75",
                        style: { color: textColor },
                        children: h.description
                      }
                    )
                  ]
                },
                h.id
              );
            })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", "data-ocid": "experience-sections", children: activeSections.map((section, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          SectionPanel,
          {
            id: section.id,
            title: section.title,
            description: section.description,
            images: section.images,
            videos: section.videos,
            isExpanded: expandedSection === section.id,
            onToggle: () => setExpandedSection(
              expandedSection === section.id ? null : section.id
            ),
            accentColor,
            textColor,
            headerTextColor,
            defaultImage,
            index: i
          },
          section.id
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          MapSection,
          {
            markers: mapMarkers,
            accentColor,
            textColor,
            headerTextColor
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ParallaxPanel,
          {
            backgroundImage: "/assets/generated/buenos-aires-sunset-skyline.jpg",
            accentColor,
            className: "rounded-3xl py-2",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              CityGuideSection,
              {
                entries: cityGuideEntries,
                accentColor,
                textColor,
                headerTextColor
              }
            )
          }
        ),
        cityGuidePdfKey && /* @__PURE__ */ jsxRuntimeExports.jsx(
          CityGuidePdfSection,
          {
            pdfKey: cityGuidePdfKey,
            accentColor,
            headerTextColor,
            textColor
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ExclusiveServicesSection,
          {
            services: exclusiveServices,
            accentColor,
            textColor,
            headerTextColor
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  ExperiencePage as default
};
