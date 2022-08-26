export interface IHeader {
  /**
   * Element id
   */
  id?: string;
  /**
   * List of nav links
   */
  steps: string[];
  /**
   * Index of the active nav link
   */
  active: number;
  /**
   * Progress bar fill
   */
  progress?: number;
  /**
   * Show header shadow
   */
  shadow?: boolean;
  /**
   * Nav links click event
   */
  onNavClick?: (navLinkIndex: number) => void;
}
