export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number,
) => {
  let timeout: ReturnType<typeof setTimeout> | null;
  return (...args: Parameters<T>): void => {
    const later = () => {
      timeout = null;
      return func(...args);
    };
    clearTimeout(timeout!);
    timeout = setTimeout(later, wait);
  };
};
