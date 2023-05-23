class AddressProps {
    title?: string | null = null;
}

const Address = (props: AddressProps) => {

    const address: string = window.location.href;

    return <>
        <div>You are here: {address}</div>
    </>
}

export { Address };