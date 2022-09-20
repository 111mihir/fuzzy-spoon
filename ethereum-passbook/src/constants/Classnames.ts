export const AppStyle: string = `
    font-mulish
    p-2
    flex
    flex-col
    items-center
    justify-start
    min-w-screen
    min-h-screen
    text-white
    bg-gradient-to-r from-green-300 via-blue-500 to-purple-600
    space-x-3
    space-y-8
`;

export const SearchAddressStyle: string = `
    flex
    items-start
    justify-center
    space-x-4
    w-full
`;

export const InputContainerStyle: string = `
    w-2/3
    flex
    flex-col
`;

export const InputStyle: string = `
    focus:outline-0
    rounded-md
    text-black
    p-3
`;

export const InputErrorStyle: string = `
    border-2
    border-red-500
`;

export const InputSuccessStye: string = `
    border-2
    border-green-500
`;

export const InputErrorMessageStyle: string = `
    text-l
    pt-2
    font-bold
    text-red-500
`;

export const SearchButtonStyle: string = `
    text-white
    font-bold
    py-2
    px-4
    rounded-full
    bg-teal-500
    border-gray-400
    hover:bg-blue-700
    w-1/6
    h-12
    disabled:bg-gray-400
    disabled:cursor-not-allowed
`;

export const SearchActiveLoaderStyle: string = `
    flex
    flex-row
    justify-center
    items-center
    w-1/6
    h-12
`;
