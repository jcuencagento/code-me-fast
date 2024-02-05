import { LightningBoltIcon, MoonIcon, SunIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { Button } from "../components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../components/ui/dialog"
import { Label } from "../components/ui/label"
import { toast } from "sonner"

 
function Theme ({ setTheme }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost_header">
                    <LightningBoltIcon className="mr-2 h-4 w-4" /> Theme
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-gray-200">
                <DialogHeader>
                    <DialogTitle>Choose your theme</DialogTitle>
                    <DialogDescription>More themes to come...</DialogDescription>
                </DialogHeader>
                <div className="flex items-center justify-between">
                    <Label htmlFor="dark-theme" className="text-md font-bold">Dark theme</Label>
                    <div className="flex items-center gap-4">
                        <div className="flex p-1 gap-2 bg-gray-300 border border-black rounded-lg">
                            <div className="circle bg-gray-800 border border-black h-5 w-5 rounded-full"></div>
                            <div className="circle bg-indigo-600 border border-black h-5 w-5 rounded-full"></div>
                            <div className="circle bg-purple-700 border border-black h-5 w-5 rounded-full"></div>
                        </div>
                        <DialogClose className="m-0" asChild>
                            <Button 
                                type="submit"
                                variant="bad"
                                onClick={() => {
                                    setTheme('dark');
                                    toast('Dark theme activated!');
                                }}>
                                <span className="sr-only">Dark Theme</span>
                                <MoonIcon className="h-4 w-4" />
                            </Button>
                        </DialogClose>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <Label htmlFor="light-theme" className="text-md font-bold">Light theme</Label>
                    <div className="flex items-center gap-4">
                        <div className="flex p-1 gap-2 bg-gray-300 border border-black rounded-lg">
                            <div className="circle bg-yellow-200 border border-black h-5 w-5 rounded-full"></div>
                            <div className="circle bg-blue-200 border border-black h-5 w-5 rounded-full"></div>
                            <div className="circle bg-pink-200 border border-black h-5 w-5 rounded-full"></div>
                        </div>
                        <DialogClose className="m-0" asChild>
                            <Button 
                                type="submit"
                                variant="bad"
                                onClick={() => {
                                    setTheme('light');
                                    toast('Light theme activated!');
                                }}>
                                <span className="sr-only">Light Theme</span>
                                <SunIcon className="h-4 w-4" />
                            </Button>
                        </DialogClose>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <Label htmlFor="neutral-theme" className="text-md font-bold">Neutral theme</Label>
                    <div className="flex items-center gap-4">
                        <div className="flex p-1 gap-2 bg-gray-300 border border-black rounded-lg">
                            <div className="circle bg-taupe-400 border border-black h-5 w-5 rounded-full"></div>
                            <div className="circle bg-red-300 border border-black h-5 w-5 rounded-full"></div>
                            <div className="circle bg-teal-500 border border-black h-5 w-5 rounded-full"></div>
                        </div>
                        <DialogClose className="m-0" asChild>
                            <Button 
                                type="submit"
                                variant="bad"
                                onClick={() => {
                                    setTheme('neutral');
                                    toast('Neutral theme activated!');
                                }}>
                                <span className="sr-only">Neutral Theme</span>
                                <EyeOpenIcon className="h-4 w-4" />
                            </Button>
                        </DialogClose>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default Theme;