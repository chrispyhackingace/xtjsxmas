// Edit each door independently: replace image with a local .jpg, .jpeg, or .png path and update description.
// For music, put the cover in public/images and the MP3 in public/audio.
// Set type: 'music', image: '/images/album-cover.jpg', audio: '/audio/song.mp3',
// and startTime: 75 to begin at 1:15 (seconds; defaults to 0). Keep the door's id.
export const contentItems = [
  { id: 1, type: 'photo', title: '嘿嘿嘿嘿嘿嘿嘿', image: '/images/p1.JPG', placeholderImage: '/images/placeholder-01.svg', description: '我好丑啊。' },
  { id: 2, type: 'photo', title: '厉害厉害', image: '/images/p2.jpg', placeholderImage: '/images/placeholder-02.svg', description: '嘿！她是我姐~' },
  { id: 3, type: 'note', title: 'La distance est un peu chiante, mais au moins elle ne nous empêche pas de rester amis :)', image: '/images/placeholder-03.svg', placeholderImage: '/images/placeholder-03.svg', description: '我的法语不错吧~\n(click me!)' },
  { id: 4, type: 'music', audio: '/audio/tino.mp3', startTime: 0, title: 'Connaissez-vous cette chanson?', image: '/images/Petit_papa_noel.jpg', placeholderImage: '/images/placeholder-04.svg' },
  { id: 5, type: 'photo', title: '哇哦！', image: '/images/p3.jpg', placeholderImage: '/images/placeholder-05.svg', description: '背影不错诶嘿嘿嘿' },
  { id: 6, type: 'note', title: '虽然我们隔得很远，但是你还是跑不掉的', image: '/images/placeholder-06.svg', placeholderImage: '/images/placeholder-06.svg', description: '😈😈😈' },
  { id: 7, type: 'photo', title: '嗨咯~', image: '/images/p4.jpg', placeholderImage: '/images/placeholder-07.svg', description: '第一周结束啦！' },
  { id: 8, type: 'note', title: '认识你真的很幸运，希望以后还能一起做很多奇奇怪怪的事情', image: '/images/placeholder-08.svg', placeholderImage: '/images/placeholder-08.svg', description: ':)' },
  { id: 9, type: 'note', title: '我本来想写点很感人的东西', image: '/images/placeholder-09.svg', placeholderImage: '/images/placeholder-09.svg', description: '算了，懒得写' },
  { id: 10, type: 'music', audio: '/audio/eason.mp3', startTime: 0, title: '圣诞结 :(', image: '/images/eason.webp', placeholderImage: '/images/placeholder-10.svg'},
  { id: 11, type: 'photo', title: '我的头发不见了', image: '/images/p5.jpg', placeholderImage: '/images/placeholder-11.svg', description: '怎么办呀?' },
  { id: 12, type: 'note', title: '小笑话', image: '/images/placeholder-12.svg', placeholderImage: '/images/placeholder-12.svg', description: '别半途而废哦~' },
  { id: 13, type: 'photo', title: '我偷拍的不错诶', image: '/images/p6.jpg', placeholderImage: '/images/placeholder-13.svg', description: '这次不收你钱哦，我的心是不是很好啊' },
  { id: 14, type: 'note', title: '认识你真的很幸运，希望以后还能一起做很多奇奇怪怪的事情', image: '/images/placeholder-14.svg', placeholderImage: '/images/placeholder-14.svg', description: 'MWAHAHAHAHA' },
  { id: 15, type: 'note', title: '2026年度最会活着奖', image: '/images/placeholder-15.svg', placeholderImage: '/images/placeholder-15.svg', description: '获奖人: 你; 获奖理由: 活到了现在' },
  { id: 16, type: 'note', title: '都第16天了，你居然还没有发现这个圣诞日历到底有什么意义', image: '/images/placeholder-16.svg', placeholderImage: '/images/placeholder-16.svg', description: '其实我也不知道' },
  { id: 17, type: 'photo', title: '脑袋好用', image: '/images/p7.jpg', placeholderImage: '/images/placeholder-17.svg', description: '手也好事' },
  { id: 18, type: 'music', audio: '/audio/dalida.mp3', startTime: 0, title: '这是谁啊？', image: '/images/dalida.jpg', placeholderImage: '/images/placeholder-18.svg' },
  { id: 19, type: 'photo', title: '两个美人,', image: '/images/p8.jpg', placeholderImage: '/images/placeholder-19.svg', description: '但右边的更美' },
  { id: 20, type: 'note', title: '还有四天就结束了', image: '/images/placeholder-20.svg', placeholderImage: '/images/placeholder-20.svg', description: '说实话，我已经不知道还能往里面塞什么了 (所以这个门就是这个)' },
  { id: 21, type: 'note', title: '还有三天', image: '/images/placeholder-21.svg', placeholderImage: '/images/placeholder-21.svg', description: '你应该知道这意味着什么' },
  { id: 22, type: 'note', title: '倒数第二个', image: '/images/placeholder-22.svg', placeholderImage: '/images/placeholder-22.svg', description: '不许偷看后面的 (我知道你不能😈😈😈)' },
  { id: 23, type: 'music', audio: '/audio/mariah.mp3', startTime: 39, title: '这是美国圣诞节的核心', image: '/images/mariah.jpg', placeholderImage: '/images/placeholder-23.svg'},
  { id: 24, type: 'note', title: '终于24天了', image: '/images/placeholder-24.svg', placeholderImage: '/images/placeholder-24.svg', description: '做这个东西的时候其实没想那么多，就是觉得每天塞一点奇怪的东西给你应该挺好玩的，结果真的做到最后了。这一年确实发生了不少事情，也留下了很多挺好笑的回忆。虽然我们现在离得有点远，一个在中国，一个在美国，但至少还能隔着这么远互相发疯。所以，谢谢你今年陪我一起发疯。希望明年也别突然变成一个很无聊的人。圣诞快乐。以及恭喜你，你终于成功打开了全部24个门。抱歉，没有奖励。' },
];

export const ornamentTypes = ['tree', 'star', 'present', 'candy', 'bell', 'holly', 'mitten', 'snowflake', 'wreath', 'stocking', 'gingerbread', 'lantern'];
const doorColors = ['red', 'green', 'cream'];
const fixedDoorOrder = [24, 2, 20, 17, 14, 21, 10, 5, 12, 7, 19, 3, 8, 1, 16, 18, 15, 9, 22, 11, 23, 6, 4, 13];

function shuffle(values) {
  const result = [...values];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

function areOrthogonallyAdjacent(firstSlot, secondSlot, columns) {
  const firstRow = Math.floor(firstSlot / columns);
  const firstColumn = firstSlot % columns;
  const secondRow = Math.floor(secondSlot / columns);
  const secondColumn = secondSlot % columns;
  return Math.abs(firstRow - secondRow) + Math.abs(firstColumn - secondColumn) === 1;
}

function createDoorOrder() {
  const slots = Array(24).fill(null);
  const days = Array.from({ length: 24 }, (_, index) => index + 1);
  const columns = [6, 4];

  function place(slotIndex) {
    if (slotIndex === slots.length) return true;

    for (const day of shuffle(days.filter((candidate) => !slots.includes(candidate)))) {
      const touchesConsecutiveDay = slots.some((placedDay, placedSlot) => (
        placedDay !== null
        && Math.abs(placedDay - day) === 1
        && columns.some((columnCount) => areOrthogonallyAdjacent(slotIndex, placedSlot, columnCount))
      ));
      if (touchesConsecutiveDay) continue;

      slots[slotIndex] = day;
      if (place(slotIndex + 1)) return true;
      slots[slotIndex] = null;
    }

    return false;
  }

  return place(0) ? slots : shuffle(days);
}

export function getPersistentAssignment() {
  const storageKey = 'christmas-2026-door-assignment-v2';
  const stored = window.localStorage.getItem(storageKey);

  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length === contentItems.length) return parsed;
    } catch {
      window.localStorage.removeItem(storageKey);
    }
  }

  const fixedAssignment = contentItems.map((item) => item.id);
  window.localStorage.setItem(storageKey, JSON.stringify(fixedAssignment));
  return fixedAssignment;
}

export function getPersistentDoorLayout() {
  const storageKey = 'christmas-2026-door-layout-v3';
  const stored = window.localStorage.getItem(storageKey);

  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length === contentItems.length) return parsed;
    } catch {
      window.localStorage.removeItem(storageKey);
    }
  }

  const layout = fixedDoorOrder.map((day, index) => ({
    day,
    color: doorColors[index % doorColors.length],
    ornament: ornamentTypes[index % ornamentTypes.length],
  }));
  window.localStorage.setItem(storageKey, JSON.stringify(layout));
  return layout;
}

export function getPersistentOpenedDays() {
  // Bump this key when intentionally resetting the calendar for a new release.
  const storageKey = 'christmas-2026-opened-days-v2';
  const stored = window.localStorage.getItem(storageKey);

  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) return new Set(parsed.filter((day) => Number.isInteger(day) && day >= 1 && day <= 24));
    } catch {
      window.localStorage.removeItem(storageKey);
    }
  }

  return new Set();
}

export function persistOpenedDays(openedDays) {
  window.localStorage.setItem('christmas-2026-opened-days-v2', JSON.stringify([...openedDays]));
}
