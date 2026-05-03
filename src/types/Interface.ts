export interface ChildComponentProps {
  handleBurgarClick: () => void;

  onUserUpdate?: (name: string, id: number) => void; // অপশনাল করে দিন
  onCancel?: () => void;
}
export interface SurahListSidebarProps {
  openSurahList: boolean;
}
