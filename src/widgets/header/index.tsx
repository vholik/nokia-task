import style from './style.module.scss';

export const Header = () => {
    return (
        <div className="container">
            <header className={style.wrapper}>
                <div className={style.logo}>COVID19 Stats</div>
                <a
                    className={style.link}
                    target="_blank"
                    href="https://github.com/vholik"
                    rel="noreferrer"
                >
                    by Viktor Holik
                </a>
            </header>
        </div>
    );
};
