import * as React from 'react';

interface HoverableProps {
  isHovered: boolean;
  toggleHovered: (e: React.MouseEvent<HTMLElement>) => void;
}

interface Props {
  render: RenderCallback<HoverableProps>;
}

const initialStyle = { isHovered: false };
type State = Readonly<typeof initialStyle>;

export class Hoverable extends React.Component<Props, State> {
  public readonly state: State = initialStyle;

  private toggleHovered = (e: React.MouseEvent<HTMLElement>) => {
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
