export default {
    bind (el, binding) {
        /* eslint-disable no-unused-vars */
        const { modifiers, value } = binding;
        if (!value.draggable) return;
        el.onmousedown = e => {
            const evt = window.event || e;
            const disX = evt.clientX - value.x;
            const disY = evt.clientY - value.y;

            document.onmousemove = event => {
                const moveEvent = window.event || event;
                const { height, width } = el.style;
                const $W = Number(width.split('px')[0]);
                const $H = Number(height.split('px')[0]);
                const L = moveEvent.clientX - disX < 0 ? 0 : moveEvent.clientX - disX;
                const T = moveEvent.clientY - disY < 0 ? 0 : moveEvent.clientY - disY;

                // if (L < 0) {
                //     L = 0;
                // } else if (el.offsetLeft + el.style.width) {}

                value.x = L;
                value.y = T;

                el.style.left = `${L}px`;
                el.style.top = `${T}px`;
            };

            document.onmouseup = () => {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        };
    }
};
