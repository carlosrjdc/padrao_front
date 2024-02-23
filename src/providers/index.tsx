
import ProviderNextAuth from "./nextAuthProvider";
import ProviderUseQuery from "./useQueryProvider";
import ToastProvider from "./toastProvider";

export default function Providers({ children }: { children?: React.ReactNode }) {
  return (
    <ProviderNextAuth>
      <ProviderUseQuery>
        {children}
        <ToastProvider />
      </ProviderUseQuery>
    </ProviderNextAuth>
  );
}
