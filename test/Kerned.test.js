import { shallowMount } from '@vue/test-utils';
import Kerned from '@/components/Kerned.vue';

describe('Kerned', () => {
  let wrapper;

  const factory = propsData => {
    wrapper = shallowMount(Kerned, {
      propsData,
    });
  };

  const getHtml = () => wrapper.html();

  it('renders a simple string when a string is passed', () => {
    factory({ letters: 'hello' });
    expect(getHtml()).toMatchInlineSnapshot(
      `"<span><span>h</span><span>e</span><span>l</span><span>l</span><span>o</span></span>"`,
    );
  });

  it('renders a single kerned letter when an object is passed', () => {
    factory({ letters: { character: 'h', letterSpacing: '-0.5rem' } });
    expect(getHtml()).toMatchInlineSnapshot(
      `"<span><span style=\\"letter-spacing: -0.5rem;\\">h</span></span>"`,
    );
  });

  it('renders kerned letters when an array is passed', () => {
    const letters = [
      'H',
      { character: 'e', letterSpacing: '-0.02rem' },
      { character: 'l', letterSpacing: '-0.03rem' },
      'lo',
    ];
    factory({ letters });
    expect(getHtml()).toMatchInlineSnapshot(
      `"<span><span>H</span><span style=\\"letter-spacing: -0.02rem;\\">e</span><span style=\\"letter-spacing: -0.03rem;\\">l</span><span>l</span><span>o</span></span>"`,
    );
  });

  it('renders nothing when an empty array is passed', () => {
    factory({ letters: [] });
    expect(getHtml()).toMatchInlineSnapshot(`"<span></span>"`);
  });

  it('renders nothing when an empty string is passed', () => {
    factory({ letters: '' });
    expect(getHtml()).toMatchInlineSnapshot(`"<span></span>"`);
  });

  it('renders nothing when undefined is passed', () => {
    factory({ letters: undefined });
    expect(getHtml()).toMatchInlineSnapshot(`"<span></span>"`);
  });
});
