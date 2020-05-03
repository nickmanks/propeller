
export default {
  setup: (ref, container)=> {
    const ctx = ref.current.getContext('2d');
    const div = document.getElementById(container);

    if (window.devicePixelRatio > 1) {
      ctx.canvas.width = div.clientWidth * 2;
      ctx.canvas.height = div.clientHeight * 2;

      ctx.scale(2, 2);
    } else {
      ctx.canvas.width = div.clientWidth;
      ctx.canvas.height = div.clientHeight;
    }
  },

  ready: (ref)=> Boolean(ref.current),

  clear: (ref)=> {
    const ctx = ref.current.getContext('2d');

    ctx.clearRect(0, 0, ref.current.width, ref.current.height);
  },

  pan: (ref, [x, y])=> {
    const ctx = ref.current.getContext('2d');

    ctx.translate(x, y);
  },

  transform: (ref, matrix)=> {
    const ctx = ref.current.getContext('2d');

    ctx.transform(...matrix);
  },

  image: (ref, image, x, y, width, height)=> {
    const ctx = ref.current.getContext('2d');
    ctx.drawImage(image, x, y, width, height);
  },

  getDimensions: (ref)=> ({
    width: ref.current.width,
    height: ref.current.height
  }),

  getMousePosition: (ref, event)=> {
    const rect = ref.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    return {x, y};
  }
};
