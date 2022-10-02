import { Component, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};
type State = {
  hasError: boolean;
  error: string;
};

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: '' };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error: error.toString() };
  }

  public override render() {
    if (this.state.hasError) {
      return (
        <div>
          <div>
            <h2>App Crashed</h2>
            <p>Something has went wrong.</p>
            {this.state.error}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
