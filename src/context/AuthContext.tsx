import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useActiveAccount, useActiveWallet, useDisconnect } from "thirdweb/react";
import { Wallet } from "thirdweb/wallets";

interface AuthContextType {
  isConnected: boolean;
  address: string | undefined;
  connectWithGoogle: () => Promise<Wallet | null>;
  connectWithPasskey: () => Promise<Wallet | null>;
  disconnect: () => void;
  wallet: Wallet | undefined;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const account = useActiveAccount();
  const wallet = useActiveWallet();
  const { disconnect: disconnectWallet } = useDisconnect();
  // Removed connectionStatus as it is not available in "thirdweb/react"

  const [isConnected, setIsConnected] = useState(false);

  // Check localStorage for existing connection on initial load
  useEffect(() => {
    const previouslyConnected = localStorage.getItem("walletConnected") === "true";
    if (previouslyConnected) {
    
    }
  }, []);

  // Update connection state and persist it
  useEffect(() => {
    const connected = !!account?.address;
    setIsConnected(connected);
    
    if (connected) {
      localStorage.setItem("walletConnected", "true");
      // Store additional connection info if needed
      localStorage.setItem("connectionMethod", wallet?.id || "");
    } else {
      localStorage.removeItem("walletConnected");
      localStorage.removeItem("connectionMethod");
    }
  }, [account?.address, wallet]);

  const disconnect = () => {
    if (wallet) {
      disconnectWallet(wallet);
      localStorage.removeItem("walletConnected");
      localStorage.removeItem("connectionMethod");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isConnected,
        address: account?.address,
        connectWithGoogle,
        connectWithPasskey,
        disconnect,
        wallet,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};