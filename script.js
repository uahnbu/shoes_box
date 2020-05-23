const optimize = (w, l, h, t, name) => {
  const boxes = {
    B1:  { l: 181, w: 111, h: 70 , weight: 73.71  },
    B2:  { l: 195, w: 130, h: 75 , weight: 87.89  },
    B3:  { l: 251, w: 121, h: 90 , weight: 107.73 },
    B13: { l: 225, w: 160, h: 90 , weight: 121.91 },
    B4:  { l: 300, w: 130, h: 100, weight: 141.75 },
    B5:  { l: 324, w: 140, h: 111, weight: 164.43 },
    B14: { l: 286, w: 181, h: 100, weight: 167.27 },
    B9:  { l: 325, w: 151, h: 106, weight: 170.1  },
    B11: { l: 311, w: 171, h: 116, weight: 198.45 },
    B10: { l: 356, w: 171, h: 116, weight: 201.29 },
    B16: { l: 321, w: 200, h: 111, weight: 215.46 },
    C18: { l: 330, w: 225, h: 116, weight: 240    },
    B7:  { l: 370, w: 160, h: 130, weight: 240.98 },
    B12: { l: 365, w: 205, h: 130, weight: 252.31 },
    B19: { l: 349, w: 230, h: 121, weight: 252.32 },
    B20: { l: 370, w: 235, h: 130, weight: 283.5  },
    B21: { l: 390, w: 241, h: 140, weight: 326.03 },
    N4:  { l: 375, w: 290, h: 135, weight: 340    },
    N5:  { l: 435, w: 335, h: 150, weight: 470    }
  };
  const names = Array(19).fill().map((_, i) => 6 + (i >> 1) + (i & 1 ? 'T' : ''));
  const dist = names.map((_, i) => Math.exp(-((i / 2 - 4) ** 2) / 2) / Math.sqrt(2 * Math.PI));
  const sizes = names.map((d, i) => (
    d = i - names.indexOf(name),
    { w: w + d * 1.5, l: l + d * 5.0, h: h + d * 1.7, t: t + d * 0.4 }
  ));
  for (const data of [ names, dist, sizes ]) {
    data.splice(17, 1); data.splice(15, 1);
  }
  const fits = sizes.map(({w, l, h, t}) => Object.values(boxes).filter((box, i) => (
    i = Math.sqrt((h - t) ** 2 + 0.36 * l ** 2),
    box.h >= w + 10
    && box.w >= h
    && box.l >= l + (
      0.4 * l
      + i / (h - t)
      + t
      * (0.4 * l + i / (h - t))
      / (2/3 * (h - t) + 10 * i / 0.6 / l ** 2)
    ) * (
      1
      + (h - Math.min(box.w, 10 * i / 0.6 / l ** 2 + 5/3 * h + t / 3))
      / (2/3 * (h - t) + 10 * i / 0.6 / l ** 2 + t)
    )
  ))[0]).map(box => Object.keys(boxes)[Object.values(boxes).indexOf(box)]);
  console.table(boxes);
  console.table(names.reduce((data, name, i) => (
    data[name] = {...sizes[i], 'Minimum Box': fits[i]},
    data
  ), {}));
  let min = 1/0, optimized, looper;
  (looper = stack => {
    if (stack.length === 3 || stack.length === 4) {
      const total = stack.concat(16).reduce((sum, pivot, i) => sum + (
        dist.slice(stack[i - 1] + 1 || 0, pivot + 1).reduce((sum, d) => sum + d, 0)
      ) * boxes[fits[pivot]].weight, 0);
      console.log(...stack, total);
      if (total < min) { min = total; optimized = stack }
      if (stack.lenth === 4) return;
    }
    const pivot = stack[stack.length - 1] || 0;
    for (let i = pivot + 1; i < fits.length - stack.length + 1; i++) {
      if (fits[i] !== fits[i + 1]) looper(stack.concat(i));
    }
  })([]);
  optimized.push(16);
  return optimized.map((pivot, i) => [
    names[optimized[i - 1] + 1 || 0] + ' - ' + names[pivot],
    fits[pivot]
  ]);
};
console.table(optimize(100, 200, 150, 50, '7'));
