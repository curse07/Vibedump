import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Input } from "../../components/ui/input";

// Sample suggestion data for mapping
const suggestions = [
  { id: 1, text: "Can you help me calm down ?" },
  { id: 2, text: "Why do i feel so anxious lately ?" },
  { id: 3, text: "I'm feeling overwhelmed. What should I do ?" },
];

export const ChatBotUi = (): JSX.Element => {
  return (
    <div className="bg-white flex flex-row justify-center w-screen h-screen overflow-auto">
      <div className="bg-white overflow-hidden w-full h-full relative">
        {/* Gradient background effects */}
        <div className="absolute w-11/12 max-w-[883px] h-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="absolute w-[544px] h-[464px] top-0 left-[136px]">
            <div className="relative h-[464px]">
              <div className="absolute w-[280px] h-[280px] top-0 left-[264px] bg-[#89bcff] rounded-[140px] blur-[150px]" />
              <div className="absolute w-[414px] h-[414px] top-[50px] left-0 bg-[#ff86e1] rounded-[207px] blur-[250px]" />
            </div>
          </div>

          {/* Suggestions section */}
          <div className="absolute top-[108px] left-2.5 font-bold text-[#56637e] text-sm font-['Manrope',Helvetica]">
            Suggestions on what to ask Our AI
          </div>

          {/* Suggestion cards */}
          <button className="inline-flex justify-center gap-2.5 p-2.5 top-36 left-0 bg-[#ffffff80] rounded-lg border border-solid border-white items-center absolute transform hover:scale-105 transition duration-200">
            <div className="relative w-[274px] mt-[-1.00px] font-['DM_Sans',Helvetica] font-normal text-[#160211] text-sm tracking-[0] leading-[normal]">
              {suggestions[0].text}
            </div>
          </button>

          <button className="inline-flex justify-center gap-2.5 p-2.5 top-36 left-[308px] bg-[#ffffff80] rounded-lg border border-solid border-white items-center absolute transform hover:scale-105 transition duration-200">
            <div className="relative w-[274px] mt-[-1.00px] font-['DM_Sans',Helvetica] font-normal text-[#160211] text-sm tracking-[0] leading-[normal]">
              {suggestions[1].text}
            </div>
          </button>

          <button className="inline-flex h-14 justify-center gap-2.5 p-2.5 top-36 left-[616px] bg-[#ffffff80] rounded-lg border border-solid border-white items-center absolute transform hover:scale-105 transition duration-200">
            <div className="relative w-[247px] mt-[-1.00px] font-['DM_Sans',Helvetica] font-normal text-[#160211] text-sm tracking-[0] leading-[normal]">
              {suggestions[2].text}
            </div>
          </button>

          {/* Input field */}
          <Card className="flex w-[883px] justify-between p-2.5 top-[238px] left-0 bg-white rounded-lg border border-solid border-[#1602114c] items-center absolute">
            <Input
              className="w-full text-sm text-[#56637e] font-['Manrope',Helvetica] 
             border-none outline-none ring-0 focus:ring-0 focus:outline-none focus:border-none focus:shadow-none shadow-none 
             !border-none !outline-none !ring-0 !focus:ring-0 !focus:outline-none !focus:border-none !focus:shadow-none"
              placeholder="How are you feeling today ?"
            />
            <Button variant="ghost" size="icon" className="p-0">
            <img src="./send.png" alt="Send" className="w-6 h-6" />
            </Button>
          </Card>
        </div>

        {/* Header section */}
        <div className="flex flex-col w-[409px] gap-12 top-[164px] left-1/2 transform -translate-x-1/2 items-center absolute">
          <img
            className="relative w-9 h-[37.83px]"
            alt="Logo"
            src="./logo.png"
          />
          <h1 className="relative self-stretch font-['Manrope',Helvetica] font-normal text-[#160211] text-2xl text-center tracking-[0] leading-[normal]">
            Talk to your AI therapist
          </h1>
        </div>
      </div>
    </div>
  );
};
