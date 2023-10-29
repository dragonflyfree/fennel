import Html, { escapeHtml } from "@kitajs/html"
import type * as CSS from "csstype"
import { fennel } from "fennel"

const Container = fennel(
    {
        tag: "div",
        children: [] as Html.Children,

        id: "container",
        class: "container",
        style: "" as string | CSS.Properties,
    },

    ({ tag, children, ...props }) =>
        <tag of={tag} {...props}>
            {children}
        </tag>
)

console.log(
    <Container id="my-container" style={{ margin: "5px" }}>
        hello
    </Container>
)



const SafeContainer = Container.new(
    {
        tag: "p",
        id: "safe-container",
        class: "safe-container"
    },

    ({ children, ...rest }) =>
        Container({ ...rest, children: escapeHtml(children) })
)

console.log(
    <SafeContainer>
        <p>hello</p>
    </SafeContainer>
)



const WrapperDefaults = {
    Container,
    tag: "main",
}

const Wrapper = fennel(
    WrapperDefaults as typeof WrapperDefaults & typeof Container.values,

    ({ Container, ...props }) =>
        <Container {...props} />
)

console.log(
    <Wrapper>
        hello
    </Wrapper>
)



const SafeWrapper = Wrapper.new({
    Container: SafeContainer,
    id: "safe-wrapper",
    class: "safe-wrapper",
    style: {
        backgroundColor: "green"
    }
})

console.log(
    <SafeWrapper style={{ backgroundColor: "red", margin: "4px" }}>
        <p>hello</p>
    </SafeWrapper>
)



const bodyHook = (children: Html.Children) => <body>{children}</body>

const WrapperWithBody = Wrapper.new(undefined, undefined, bodyHook)

console.log(
    <WrapperWithBody>
        hello
    </WrapperWithBody>
)