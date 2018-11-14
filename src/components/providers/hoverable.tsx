import * as React from 'react';

interface HoverableProps {
  isHovered: boolean;
  toggleHovered: (e: React.MouseEvent<HTMLElement>) => void;
}

interface Props {
  children: RenderCallback<HoverableProps>;
}

const initialStyle = { isHovered: false };
type State = Readonly<typeof initialStyle>;

export class Hoverable extends React.Component<Props, State> {
  readonly state: State = initialStyle;

  private toggleHovered = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    this.setState(prevState => ({ isHovered: !prevState.isHovered }));
  };

  public render() {
    const { children } = this.props;
    const { isHovered } = this.state;

    const renderProps = {
      isHovered,
      toggleHovered: this.toggleHovered,
    };

    return children && children({ ...renderProps });
  }
}
