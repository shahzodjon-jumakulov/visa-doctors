export default defineAppConfig({
  ui: {
    primary: "rose",
    gray: "neutral",
    container: {
      base: "mx-auto",
      padding: "px-5 sm:px-5 lg:px-10",
      constrained: "max-w-7xl",
    },
    button: {
      base: "focus:outline-none focus-visible:outline-0 flex-shrink-0 transition-colors",
      font: "font-semibold",
      rounded: "rounded-lg",
      size: {
        sm: "text-base",
      },
      gap: {
        sm: "gap-x-1",
      },
      padding: {
        sm: "px-6 py-4",
      },
      color: {
        primary: {
          solid:
            "shadow-none ring-0 text-white bg-red-main hover:bg-red-hover active:bg-red-pressed disabled:bg-black-200 disabled:text-black-400",
        },
        secondary: {
          solid:
            "shadow-none ring-0 text-white bg-black-main hover:bg-black-600 active:bg-black-500 disabled:bg-black-200 disabled:text-black-400",
        },
      },
      icon: {
        size: {
          sm: "h-5 w-5",
        },
      },
    },
  },
});
