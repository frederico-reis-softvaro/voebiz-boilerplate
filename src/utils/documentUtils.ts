export const mapToCssModules = (cssModule: Array<string | undefined> = []): string => {
  if (!cssModule) {
    return cssModule;
  }

  return cssModule.filter((className: string | undefined) => !!className).join(" ");
};

export function removeMask(value: string): string {
  return value.replace(/[-./]/gi, "");
}

export const regexPhoneFormatter = (e: React.ChangeEvent<HTMLInputElement>) => {
  return e.target.value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .replace(/(\d{4})-(\d)(\d{4})/, "$1$2-$3")
    .replace(/(-\d{4})\d+?$/, "$1");
};

export const formatCpf = (e: React.ChangeEvent<HTMLInputElement>) => {
  return e.target.value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};
