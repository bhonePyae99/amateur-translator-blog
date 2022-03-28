import { useState, useEffect } from "react";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
const ChapterSelect = ({ items, setDisplayChapters }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentSelect, setCurrentSelect] = useState(_.chunk(items, 50)[0]);
  const test = _.chunk(items, 50);
  return (
    <>
      <div>
        <div
          className="py-2 inline-block border-2 border-blue-400 rounded px-4 cursor-pointer"
          onClick={() => {
            setShowDropdown((s) => !s);
          }}
        >
          Chapter {currentSelect[0]} - {currentSelect[currentSelect.length - 1]}
          <FontAwesomeIcon
            icon={!showDropdown ? faChevronDown : faChevronUp}
            className="ml-2 cursor-pointer"
          />
        </div>
        {showDropdown && (
          <ul className="list-none border-2 border-blue-400 min-w-[159.16px] bg-white px-2 py-2 mt-1 absolute">
            {test.map((item) => (
              <li
                className={
                  item === currentSelect
                    ? "py-1 border-b cursor-pointer text-gray-400 font-bold"
                    : "py-1 border-b cursor-pointer"
                }
                onClick={() => {
                  setCurrentSelect(item);
                  setDisplayChapters(item);
                  setShowDropdown(false);
                }}
                key={item[0]}
              >
                Chapters {item[0]} - {item[item.length - 1]}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default ChapterSelect;
