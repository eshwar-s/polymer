import { ThemeColor } from "../model/todo-settings";

export default function getThemeColors(themeColor) {
  switch (themeColor) {
    case ThemeColor.BLUE:
      return {
        "--light-primary-color": "var(--paper-blue-100)",
        "--primary-color": "var(--paper-blue-400)",
        "--dark-primary-color": "var(--paper-blue-300)",
        "--secondary-color": "var(--paper-grey-300)"
      };

    case ThemeColor.PURPLE:
      return {
        "--light-primary-color": "var(--paper-purple-100)",
        "--primary-color": "var(--paper-purple-400)",
        "--dark-primary-color": "var(--paper-purple-300)",
        "--secondary-color": "var(--paper-grey-300)"
      };

    case ThemeColor.RED:
      return {
        "--light-primary-color": "var(--paper-red-100)",
        "--primary-color": "var(--paper-red-400)",
        "--dark-primary-color": "var(--paper-red-300)",
        "--secondary-color": "var(--paper-grey-300)"
      };

    case ThemeColor.GREEN:
      return {
        "--light-primary-color": "var(--paper-green-100)",
        "--primary-color": "var(--paper-green-400)",
        "--dark-primary-color": "var(--paper-green-300)",
        "--secondary-color": "var(--paper-grey-300)"
      };

    case ThemeColor.TEAL:
      return {
        "--light-primary-color": "var(--paper-teal-100)",
        "--primary-color": "var(--paper-teal-400)",
        "--dark-primary-color": "var(--paper-teal-300)",
        "--secondary-color": "var(--paper-grey-300)"
      };

    case ThemeColor.INDIGO:
    default:
      return {
        "--light-primary-color": "var(--paper-indigo-100)",
        "--primary-color": "var(--paper-indigo-400)",
        "--dark-primary-color": "var(--paper-indigo-300)",
        "--secondary-color": "var(--paper-grey-300)"
      };
  }
}
