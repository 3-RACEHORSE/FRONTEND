export const handleToggle = (
  index: number,
  buttonStates: { index: number; label: string; isActive: boolean }[],
  setButtonStates: React.Dispatch<
    React.SetStateAction<{ index: number; label: string; isActive: boolean }[]>
  >,
  setApple: React.Dispatch<React.SetStateAction<{ [index: number]: string }[]>>
) => {
  const updatedButtons = buttonStates.map((button, i) =>
    i === index ? { ...button, isActive: !button.isActive } : button
  );
  setButtonStates(updatedButtons);

  const activeButtons = updatedButtons.filter((button) => button.isActive);
  const formattedActiveButtons = activeButtons.reduce((acc, cur) => {
    acc[cur.index] = cur.label;
    return acc;
  }, {} as { [index: number]: string });
  setApple([formattedActiveButtons]);
};
