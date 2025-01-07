import React, { useState, useRef, useEffect } from 'react';
import { Form } from 'react-bootstrap';

const MultiSelectDropdown = (
    props: {
        genres: string[],
        setSelectedOptions: React.Dispatch<React.SetStateAction<string[] | undefined>>
    }
) => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<any>(null);
    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (dropdownRef.current &&
                !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionChange = (event: any) => {
        const optionId = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            updateSelectedOptions([...selectedOptions, optionId]);
        } else {
            updateSelectedOptions(selectedOptions.filter((id) => id !== optionId));
        }
    };

    const updateSelectedOptions = (options: string[]) => {
        setSelectedOptions(options);
        props.setSelectedOptions(options)
    }

    return (
        <div ref={dropdownRef} className={`dropdown ${isOpen ? 'show' : ''}`}>
            <button
                style={{ width: "100%" }}
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="multiSelectDropdown"
                onClick={toggleDropdown}
            >
                Select Genres
            </button>
            <div style={{ width: "100%" }} className={`dropdown-menu ${isOpen ? 'show' : ''}`} aria-labelledby="multiSelectDropdown">
                {props.genres.map((option, idx) => (
                    <Form.Check
                        style={{ marginLeft: "10%" }}
                        key={option}
                        type="checkbox"
                        id={`option_${idx}`}
                        label={option}
                        checked={selectedOptions.includes(option)}
                        onChange={handleOptionChange}
                        value={option}
                    />
                ))}
            </div>
        </div>
    );
};

export default MultiSelectDropdown;