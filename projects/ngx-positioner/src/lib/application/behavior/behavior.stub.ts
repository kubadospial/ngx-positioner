export const prepareBehaviorServiceStub = (scrollTop: number) => ({
  scrollableElement: {
    scrollTop,
    clientHeight: 545,
    scrollHeight: 16000,
    offsetHeight: 545,
  } as HTMLElement,
  scrollTop,
  scroll: () => {},
});

export const behaviorServiceStub = prepareBehaviorServiceStub(0);
