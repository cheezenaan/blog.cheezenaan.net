import * as React from 'react';

interface HoverableProps {
  isHovered: boolean;
  toggleHovered: (e: React.MouseEvent<HTMLElement>) => void;
}

interface Props {
  render: RenderCallback<HoverableProps>;
}
type State = { isHovered: boolean };

export class Hoverable extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    this.state = { isHovered: false };
  }

  private toggleHovered = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    this.setState(prevState => ({ isHovered: !prevState.isHovered }));
  };

  public render(): React.ReactNode {
    const { render } = this.props;
    const { isHovered } = this.state;

    const renderProps = {
      isHovered,
      toggleHovered: this.toggleHovered,
    };

    return render({ ...renderProps });
  }
}
