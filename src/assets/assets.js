import { Coins, FunnelPlus, icons, LayoutDashboard, List, Wallet } from "lucide-react";
import logo from "./solosynclogo.png";

export const assets = {
    logo
}

export const SIDE_BAR_DATA = [
    {
        id:"01",
        label:"Dashboard",
        icons:LayoutDashboard,
        path:"/dashboard"
    },
      {
        id:"02",
        label:"Category",
        icons:List,
        path:"/category"
    },
      {
        id:"03",
        label:"Income",
        icons:Wallet,
        path:"/income"
    },
      {
        id:"04",
        label:"Expense",
        icons:Coins,
        path:"/expense"
    },
      {
        id:"05",
        label:"Filter",
        icons:FunnelPlus,
        path:"/filter"
    }
];
