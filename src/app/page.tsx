import Input from "@/components/Input";

export default function Home() {
  return (
    <section className="p-4 h-screen flex items-center justify-center">
      <form
        className="bg-neutral-50 p-4 flex flex-col border border-neutral-600 gap-4 max-w-md"
        action=""
      >
        {/* <div className="flex flex-col w-full">
          <label className="text-xs font-medium" htmlFor="">
            Nomor NIK:
          </label>
          <div className="flex gap-2">
            <input
              className="p-2 border rounded border-neutral-500 bg-inherit"
              type="number"
            />
            <button className="bg-orange-600 p-2 border border-orange-600 rounded">
              <svg
                fill="#fafafa"
                height="20px"
                width="20px"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 490.4 490.4"
                xmlSpace="preserve"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <g>
                    <path d="M484.1,454.796l-110.5-110.6c29.8-36.3,47.6-82.8,47.6-133.4c0-116.3-94.3-210.6-210.6-210.6S0,94.496,0,210.796 s94.3,210.6,210.6,210.6c50.8,0,97.4-18,133.8-48l110.5,110.5c12.9,11.8,25,4.2,29.2,0C492.5,475.596,492.5,463.096,484.1,454.796z M41.1,210.796c0-93.6,75.9-169.5,169.5-169.5s169.6,75.9,169.6,169.5s-75.9,169.5-169.5,169.5S41.1,304.396,41.1,210.796z"></path>{" "}
                  </g>
                </g>
              </svg>
            </button>
          </div>
        </div> */}

        <Input />
      </form>
    </section>
  );
}
