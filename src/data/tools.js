export const getStyle = ($el, style) => {
    if (document.querySelector($el)) {
        const st = window.getComputedStyle(document.querySelector($el))[style];
        return +st.slice(0, st.length - 2);
    }
};